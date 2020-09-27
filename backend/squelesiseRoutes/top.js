const { Router } = require('express');
const { Song, Album, Artist, Playlist } = require('../models');

let router = Router();

router
/* Get top 20 songs */
.get("/songs", async (req, res) => {
    const topSongs = await Song.findAll({ limit: 20 });
    return res.json(topSongs);
})

/* Get top 20 albums */
.get("/albums", async (req, res) => {
    const topAlbums = await Album.findAll({ limit: 20});
    return res.json(topAlbums);
})

/* Get top 20 artists */
.get('/artists', async (req, res) => {
    const topArtists = await Artist.findAll({ limit: 20 });
    return res.json(topArtists);
})

/* Get top 20 playlists */
.get('/playlists', async (req, res) => {
    const topPlaylists = await Playlist.findAll({ limit: 20 });
    return res.json(topPlaylists);
});

module.exports = router;
