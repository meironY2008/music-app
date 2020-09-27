require('dotenv').config();
const express = require('express');
const artists =require('./squelesiseRoutes/artists');
const albums = require('./squelesiseRoutes/albums');
const songs = require('./squelesiseRoutes/songs');
const playlists = require('./squelesiseRoutes/playlists');
const top = require('./squelesiseRoutes/top');
const app = express();

app.use(express.json());
app.use('/artists',artists);
app.use('/albums',albums);
app.use('/songs',songs);
app.use('/playlists',playlists);
app.use('/top',top);


app.listen(3001);