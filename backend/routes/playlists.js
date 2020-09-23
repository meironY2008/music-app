const express = require('express');
let router = express.Router();
let mysql = require('mysql');

let mysqlCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

router.route('/')
.get((req, res) => {
    mysqlCon.query('SELECT * FROM playlists;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
})
.post((req, res) => {
    mysqlCon.query('INSERT INTO playlists SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

router.route(':id')
.get((req, res) => {
    mysqlCon.query('SELECT * FROM playlists WHERE Playlist_id = ?', req.params.id, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
})
.put((req, res) =>{
    mysqlCon.query(`UPDATE playlists SET ? WHERE Playlist_id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
})
.delete((req, res) =>{
    mysqlCon.query(`DELETE FROM playlists WHERE Playlist_id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});

router.route('/songs/:id')
.get((req, res) => {
    mysqlCon.query('SELECT Song_id FROM playlists p JOIN libraries l ON p.Playlist_id = l.Playlist_id WHERE p.Playlist_id = ?', req.params.id, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
});


module.exports = router;