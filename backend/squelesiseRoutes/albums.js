require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");
const { Router } = require("express");
const { Album, Artist } = require("../models");

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD,
  },
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS,
  },
});

let router = Router();

router
  .route("/")

  /* Get all albums */
  .get(async (req, res) => {
    const allAlbums = await Album.findAll({
      include: [
        {
          model: Artist,
          attributes: ["artistName", "coverImg"],
        },
      ],
    });
    return res.json(allAlbums);
  })

  /* Add an album to the database */
  .post(async (req, res) => {
    try {
      const newAlbum = await Album.create(req.body);
      const albumArtist = await Artist.findByPk(req.body.artistId);
      await client.index({
        index: "albums",
        id: req.body.id,
        body: {
          name: req.body.name,
          released: req.body.releasedAt,
          image: albumArtist.coverImg,
          artist: albumArtist.artistName,
        },
        refresh: true,
      });
      return res.status(201).json({ newAlbum });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

router
  .route("/:id")

  /* Get an album by id */
  .get(async (req, res) => {
    try {
      const specAlbum = await Album.findByPk(req.params.id, {
        include: [
          {
            model: Artist,
            attributes: ["artistName", "coverImg"],
          },
        ],
      });
      const songsOfAlbum = await specAlbum.getSongs();
      return res.status(200).json({ album: specAlbum, songs: songsOfAlbum });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })

  /* Edit an album by its unique identifier */
  .put(async (req, res) => {
    try {
      const [updated] = await Album.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedAlbum = await Album.findByPk(req.params.id);
        const albumArtist = await Artist.findByPk(req.body.artistId);
        await client.update({
          index: "albums",
          id: req.params.id,
          body: {
            name: req.body.name,
            released: req.body.releasedAt,
            image: albumArtist.coverImg,
            artist: albumArtist.artistName,
          },
          refresh: true,
        });
        return res.status(200).json({ updatedAlbum });
      }
      throw new Error("No such album");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  })

  /* Delete an album using its unique identifier */
  .delete(async (req, res) => {
    try {
      const deleted = await Album.destroy({ where: { id: req.params.id } });
      if (deleted) {
        await client.delete({
          index: "albums",
          id: req.params.id,
          refresh: true,
        });
        return res.status(204).send("Deleted Successfully");
      }
      throw new Error("No such album");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports = router;
