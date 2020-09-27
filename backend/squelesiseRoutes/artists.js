const { Router } = require("express");
const { Artist } = require("../models");

let router = Router();

router
  .route("/")
  .get(async (req, res) => {
    const allArtist = await Artist.findAll();
    return res.json(allArtist);
  })
  .post(async (req, res) => {
    try {
      const newArtist = await Artist.create(req.body);
      return res.status(201).json(newArtist);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const specArtist = await Artist.findByPk(req.params.id);
      const songsOfArtist = await specArtist.getSongs();
      const albumOfArtist = await specArtist.getAlbums();
      return res.status(200).json({artist : specArtist, albums : albumOfArtist , songs : songsOfArtist });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      // let newValues = req.body;
      let [updated] = await Artist.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updateArtist = await Artist.findByPk(req.params.id);
        return res.status(200).json(updateArtist);
      }
      throw new Error("no such artist");
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await Artist.destroy({ where: { id: req.params.id } });
      if (deleted) {
        return res.status(204).send("deleted succsefully");
      }
      throw new Error("no such artist");
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  });

module.exports = router;
