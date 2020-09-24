require('dotenv').config();
const express = require('express');
const artists =require('./squelesiseRoutes/artists');
const albums = require('./squelesiseRoutes/albums');
const app = express();

app.use(express.json());
app.use('/artists',artists);
app.use('/albums',albums)


app.listen(3001);