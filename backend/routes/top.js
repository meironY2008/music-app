const express = require('express');
let router = express.Router();
let mysql = require('mysql');

// let top = express();

let mysqlCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });


  /* Get top 20 songs */
router.get('/songs', (req, res) => {
    mysqlCon.query('SELECT * FROM songs LIMIT 20;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)   
    });
})

/* Get top 20 albums */
.get('/top/albums', (req, res) => {
    mysqlCon.query('SELECT * FROM albums LIMIT 20;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)   
    });
})

/* Get top 20 artists */
.get('/top/artists', (req, res) => {
    mysqlCon.query('SELECT * FROM artists LIMIT 20;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)   
    });
})

/* Get top 20 playlists */
.get('/top/playlists', (req, res) => {
    mysqlCon.query('SELECT * FROM playlists LIMIT 20;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)   
    });
});

module.exports = router;
