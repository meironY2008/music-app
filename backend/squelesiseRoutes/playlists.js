require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");
const { Router } = require("express");
const { Playlist, Song, Album, Artist, Library } = require("../models");

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

  /* Get all playlists */
  .get(async (req, res) => {
    const allPlaylists = await Playlist.findAll();
    return res.json(allPlaylists);
  })

  /* Add a playlist to the database */
  .post(async (req, res) => {
    try {
      const newPlaylist = await Playlist.create(req.body);
      const songsInPlaylist = await Song.findAll({
        include: [
          {
            model: Library,
            attributes: [],
            where: {
              playlistId: req.body.id,
            },
          },
        ],
      });
      await client.index({
        index: "playlists",
        id: req.body.id,
        body: {
          name: req.body.playlistName,
          image: req.body.coverImg,
          songs: songsInPlaylist.length,
        },
        refresh: true,
      });
      return res.status(201).json({ newPlaylist });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

router
  .route("/:id")

  /* Get a playlist by id */
  .get(async (req, res) => {
    try {
      const specPlaylist = await Playlist.findByPk(req.params.id);
      const songsInPlaylist = await Song.findAll({
        include: [
          {
            model: Library,
            attributes: [],
            where: {
              playlistId: req.params.id,
            },
          },
          {
            model: Artist,
            attributes: ["artistName"],
            required: true,
          },
          {
            model: Album,
            attributes: ["albumName"],
            required: true,
          },
        ],
      });
      return res
        .status(200)
        .json({ playlist: specPlaylist, songs: songsInPlaylist });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })

  /* Edit a playlist by its unique identifier */
  .put(async (req, res) => {
    try {
      const [updated] = await Playlist.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const songsInPlaylist = await Song.findAll({
          include: [
            {
              model: Library,
              attributes: [],
              where: {
                playlistId: req.params.id,
              },
            },
          ],
        });
        await client.update({
          index: "playlists",
          id: req.params.id,
          body: {
            name: req.body.playlistName,
            image: req.body.coverImg,
            songs: songsInPlaylist.length,
          },
          refresh: true,
        });
        const updatedPlaylist = await Playlist.findByPk(req.params.id);
        return res.status(200).json({ updatedPlaylist });
      }
      throw new Error("No such playlist");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  })

  /* Delete a playlist using its unique identifier */
  .delete(async (req, res) => {
    try {
      const deleted = await Playlist.destroy({ where: { id: req.params.id } });
      if (deleted) {
        await client.delete({
            index: "playlists",
            id: req.params.id,
            refresh: true
        })
        return res.status(204).send("Deleted Successfully");
      }
      throw new Error("No such playlist");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports = router;
