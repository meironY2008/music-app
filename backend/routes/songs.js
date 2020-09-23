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
    const { title } = req.query;
    title
    ?   mysqlCon.query(`SELECT * FROM songs WHERE title LIKE '${title}'`, (err, results) => {
        err ? res.send(err) : res.send(results)
    })
    :   mysqlCon.query('SELECT * FROM songs;', (error, results) => {
            if (error) {
                res.send(error.message);
                throw error;
            };
            res.send(results);
        });
}).post((req, res) => {
    mysqlCon.query('INSERT INTO songs SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

router.route('/:id')
.get((req, res) => {
    console.log(req.query);
    if (Object.keys(req.query)[0] == 'playlist') {
        mysqlCon.query(
            `SELECT * FROM songs AS s JOIN libraries AS l ON s.Song_id = l.Song_id WHERE l.Playlist_id = ${req.query.playlist} AND s.Song_id != ${req.params.id}`, (error, results) => {
            error
            ? res.send(error.message)
            : res.send(results)      
        })
    } else if (Object.keys(req.query).length > 0) {
        let key = Object.keys(req.query)[0].concat('_id');
        let value = Object.values(req.query)[0];
        mysqlCon.query('SELECT * FROM songs WHERE Song_id != ? AND ?? = ?', [req.params.id, key, value], (error, results) => {
            error
            ? res.send(error.message)
            : res.send(results)      
        })
    } else {
        mysqlCon.query(`SELECT *, (SELECT Album_Name FROM albums WHERE songs.Album_id = albums.Album_id) AS Album_Name,
        (SELECT Artist_Name FROM artists WHERE songs.Artist_id = artists.Artist_id) AS Artist_Name
         FROM songs WHERE songs.Song_id = ?`, req.params.id, (error, results) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
        });
    }
})
.put((req, res) =>{
    mysqlCon.query(`UPDATE songs SET ? WHERE Song_id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
})
.delete( (req, res) =>{
    mysqlCon.query(`DELETE FROM songs WHERE Song_id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});


module.exports = router;