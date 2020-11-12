const { Router } = require("express");
const { Album, Artist, Song, Library } = require("../models");
const { Op } = require("sequelize");

let router = Router();

router
  .route("/")
  .get(async (req, res) => {
    const allSongs = await Song.findAll({
      include: [
        {
          model: Artist,
          attributes: ["artistName"],
          required: true,
        },
        {
          model: Album,
          attributes: ["albumName", "coverImg"],
          required: true,
        },
      ]
    });
    return res.json(allSongs);
  })
  .post(async (req, res) => {
    try {
      const newSong = await Song.create(req.body);
      return res.status(201).json({ newSong });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      if (Object.keys(req.query)[0] == "playlist") {
        const songsInPlaylist = await Song.findAll({
          include: [
            {
              model: Library,
              attributes: [],
              where: {
                playlistId: req.query.playlist,
                songId: { [Op.ne]: req.params.id },
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
          ]
        });
        return res.status(200).send(songsInPlaylist);
      } else if (Object.keys(req.query)[0] == "artist") {
        const artist = await Artist.findByPk(req.query.artist);
        const songsOfArtist = await artist.getSongs({
          where: {
            id: { [Op.ne]: req.params.id },
          },
          include: [
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
          raw: true,
        });
        return res.status(200).send(songsOfArtist);
      } else if (Object.keys(req.query)[0] == "album") {
        const album = await Album.findByPk(req.query.album);
        const songsOfAlbum = await album.getSongs({
          where: {
            id: { [Op.ne]: req.params.id },
          },
          include: [
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
          ]
        });
        return res.status(200).send(songsOfAlbum);
      } else {
        const specSong = await Song.findByPk(req.params.id, {
          include: [
            {
              model: Artist,
              attributes: ["artistName"],
              required: true,
            },
            {
              model: Album,
              attributes: ["albumName", "coverImg"],
              required: true,
            },
          ]
        });
        return res.status(200).json(specSong);
      }
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      let [updated] = await Song.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updateSong = await Song.findByPk(req.params.id);
        return res.status(200).json(updateSong);
      }
      throw new Error("no such album");
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await Song.destroy({ where: { id: req.params.id } });
      if (deleted) {
        return res.status(204).send("deleted succsefully");
      }
      throw new Error("no such Song");
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  });

module.exports = router;
