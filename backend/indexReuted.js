require('dotenv').config();
const express = require('express');
let mysql = require('mysql');
const app = express();

const songs = require('./routes/songs');
const albums = require('./routes/albums');
const artists = require('./routes/artists');
const playlists = require('./routes/playlists');
const top = require('./routes/top');

app.use(express.json());
app.use('/songs',songs);
app.use('/albums',albums);
app.use('/artists',artists);
app.use('/playlists',playlists);
app.use('/top',top);
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let mysqlCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });



  mysqlCon.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

/* ----- */

/* -- GET REQUESTS -- */ 

/* Get all songs */
// app.get('/songs', (req, res) => {
//     const { title } = req.query;
//     title
//     ?   mysqlCon.query(`SELECT * FROM songs WHERE title LIKE '${title}'`, (err, results) => {
//         err ? res.send(err) : res.send(results)
//     })
//     :   mysqlCon.query('SELECT * FROM songs;', (error, results) => {
//             if (error) {
//                 res.send(error.message);
//                 throw error;
//             };
//             res.send(results);
//         });
// });

// /* Get a song by id */
// app.get('/songs/:id', (req, res) => {
//     console.log(req.query);
//     if (Object.keys(req.query)[0] == 'playlist') {
//         mysqlCon.query(
//             `SELECT * FROM songs AS s JOIN libraries AS l ON s.Song_id = l.Song_id WHERE l.Playlist_id = ${req.query.playlist} AND s.Song_id != ${req.params.id}`, (error, results) => {
//             error
//             ? res.send(error.message)
//             : res.send(results)      
//         })
//     } else if (Object.keys(req.query).length > 0) {
//         let key = Object.keys(req.query)[0].concat('_id');
//         let value = Object.values(req.query)[0];
//         mysqlCon.query('SELECT * FROM songs WHERE Song_id != ? AND ?? = ?', [req.params.id, key, value], (error, results) => {
//             error
//             ? res.send(error.message)
//             : res.send(results)      
//         })
//     } else {
//         mysqlCon.query(`SELECT *, (SELECT Album_Name FROM albums WHERE songs.Album_id = albums.Album_id) AS Album_Name,
//         (SELECT Artist_Name FROM artists WHERE songs.Artist_id = artists.Artist_id) AS Artist_Name
//          FROM songs WHERE songs.Song_id = ?`, req.params.id, (error, results) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.send(results);
//         });
//     }
// });

/* Get all albums */
// app.get('/albums', (req, res) => {
//     mysqlCon.query('SELECT * FROM albums;', (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)      
//       });
// });

/* Get an album by id */
// app.get('/albums/:id', (req, res) => {
//     mysqlCon.query('SELECT * FROM albums WHERE Album_id = ?', req.params.id, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)      
//       });
// });

/* Get all artists */
// app.get('/artists', (req, res) => {
//     mysqlCon.query('SELECT * FROM artists;', (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)      
//       });
// });

// /* Get an artist by id */
// app.get('/artists/:id', (req, res) => {
//     mysqlCon.query(
//         `SELECT * FROM artists WHERE Artist_id = ?`, req.params.id, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)      
//       });
// });

/* Get all playlists */
// app.get('/playlists', (req, res) => {
//     mysqlCon.query('SELECT * FROM playlists;', (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)      
//       });
// });

/* Get a playlist by id */
// app.get('/playlists/:id', (req, res) => {
//     mysqlCon.query('SELECT * FROM playlists WHERE Playlist_id = ?', req.params.id, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)      
//       });
// });

/* Get a playlist's songs by its id */
// app.get('/playlists/songs/:id', (req, res) => {
//     mysqlCon.query('SELECT Song_id FROM playlists p JOIN libraries l ON p.Playlist_id = l.Playlist_id WHERE p.Playlist_id = ?', req.params.id, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)      
//       });
// });

// /* Get top 20 songs */
// app.get('/top/songs', (req, res) => {
//     mysqlCon.query('SELECT * FROM songs LIMIT 20;', (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)   
//     });
// });

// /* Get top 20 albums */
// app.get('/top/albums', (req, res) => {
//     mysqlCon.query('SELECT * FROM albums LIMIT 20;', (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)   
//     });
// });

// /* Get top 20 artists */
// app.get('/top/artists', (req, res) => {
//     mysqlCon.query('SELECT * FROM artists LIMIT 20;', (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)   
//     });
// });

// /* Get top 20 playlists */
// app.get('/top/playlists', (req, res) => {
//     mysqlCon.query('SELECT * FROM playlists LIMIT 20;', (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)   
//     });
// });

/* -- POST REQUESTS -- */

/* Add a song to the database */
// app.post('/songs', (req, res) => {
//     mysqlCon.query('INSERT INTO songs SET ?', req.body, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//     });
// });

/* Add an album to the database */
// app.post('/albums', (req, res) => {
//     mysqlCon.query('INSERT INTO albums SET ?', req.body, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//     });
// });

/* Add an artist to the database */
// app.post('/artists', (req, res) => {
//     mysqlCon.query('INSERT INTO artists SET ?', req.body, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//     });
// });

/* Add a playlist to the database */
// app.post('/playlists', (req, res) => {
//     mysqlCon.query('INSERT INTO playlists SET ?', req.body, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//     });
// });

/* -- PUT REQUESTS -- */

/* Edit a song by its unique identifier */
// app.put('/songs/:id', (req, res) =>{
//     mysqlCon.query(`UPDATE songs SET ? WHERE Song_id = ${req.params.id}`, req.body, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//     });
// });

/* Edit an album by its unique identifier */
// app.put('/albums/:id', (req, res) =>{
//     mysqlCon.query(`UPDATE albums SET ? WHERE Album_id = ${req.params.id}`, req.body, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//     });
// });

// /* Edit an artist by its unique identifier */
// app.put('/artists/:id', (req, res) =>{
//     mysqlCon.query(`UPDATE artists SET ? WHERE Artist_id = ${req.params.id}`, req.body, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//     });
// });

/* Edit a playlist by its unique identifier */
// app.put('/playlists/:id', (req, res) =>{
//     mysqlCon.query(`UPDATE playlists SET ? WHERE Playlist_id = ${req.params.id}`, req.body, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//     });
// });

// /* -- DELETE REQUESTS -- */

/* Delete a song using its unique identifier */
// app.delete('/songs/:id', (req, res) =>{
//     mysqlCon.query(`DELETE FROM songs WHERE Song_id = ${req.params.id}`, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//       });
// });

/* Delete an album using its unique identifier */
// app.delete('/albums/:id', (req, res) =>{
//     mysqlCon.query(`DELETE FROM albums WHERE Album_id = ${req.params.id}`, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//       });
// });

// /* Delete an artist using its unique identifier */
// app.delete('/artists/:id', (req, res) =>{
//     mysqlCon.query(`DELETE FROM artists WHERE Artist_id = ${req.params.id}`, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//       });
// });

/* Delete a playlist using its unique identifier */
// app.delete('/playlists/:id', (req, res) =>{
//     mysqlCon.query(`DELETE FROM playlists WHERE Playlist_id = ${req.params.id}`, (error, results) => {
//         error
//         ? res.send(error.message)
//         : res.send(results)
//       });
// });

/* ----- */

app.listen(3001);