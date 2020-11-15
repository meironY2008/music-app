require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");
const { Router } = require("express");
const { Artist } = require("../models");

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
  /* Get all artists */
  .get(async (req, res) => {
    const allArtists = await Artist.findAll();
    return res.json(allArtists);
  })

  /* Add an artist to the database */
  .post(async (req, res) => {
    try {
      const newArtist = await Artist.create(req.body);
      await client.index({
        index: "artists",
        id: req.body.id,
        body: {
          name: req.body.artistName,
          image: req.body.coverImg,
        },
        refresh: true,
      });
      return res.status(201).json({ newArtist });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

router
  .route("/:id")
  /* Get an artist by id */
  .get(async (req, res) => {
    try {
      const specArtist = await Artist.findByPk(req.params.id);
      const albumsOfArtist = await specArtist.getAlbums();
      const songsOfArtist = await specArtist.getSongs();
      return res.status(200).json({
        artist: specArtist,
        albums: albumsOfArtist,
        songs: songsOfArtist,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })

  /* Edit an artist by its unique identifier */
  .put(async (req, res) => {
    try {
      const [updated] = await Artist.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        await client.update({
          index: "artists",
          id: req.params.id,
          body: {
            name: req.body.artistName,
            image: req.body.coverImg,
          },
          refresh: true,
        });
        const updatedArtist = await Artist.findByPk(req.params.id);
        return res.status(200).json({ updatedArtist });
      }
      throw new Error("No such artist");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  })

  /* Delete an artist using its unique identifier */
  .delete(async (req, res) => {
    try {
      const deleted = await Artist.destroy({ where: { id: req.params.id } });
      if (deleted) {
        await client.delete({
          index: "artists",
          id: req.params.id,
          refresh: true,
        });
        return res.status(204).send("Deleted Successfully");
      }
      throw new Error("No such artist");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports = router;
