require('dotenv').config()
const express = require('express');
var mysql = require('mysql');
const app = express();

app.use(express.json());
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

app.get('/songs', (req, res) => {
    mysqlCon.query('SELECT * FROM songs;', (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});

app.get('/albums', (req, res) => {
    mysqlCon.query('SELECT * FROM albums;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
});

app.get('/artists', (req, res) => {
    mysqlCon.query('SELECT * FROM artists;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
});


app.get('/top/songs', (req, res) => {
    mysqlCon.query('SELECT * FROM songs LIMIT 10;', (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.get('/top/albums', (req, res) => {
    mysqlCon.query('SELECT * FROM albums LIMIT 10;', (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.get('/top/artists', (req, res) => {
    mysqlCon.query('SELECT * FROM artists LIMIT 10;', (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});

/* get song from sql by id or title */
app.get('/songs/:id', (req, res) => {
    console.log(req.query);
    if (Object.keys(req.query)[0] == 'playlist') {
        mysqlCon.query(
            `SELECT * FROM songs AS s JOIN libraries AS l ON s.id = l.Song_id WHERE l.Playlist_id = ${req.query.playlist} AND s.id != ${req.params.id}`, (error, results) => {
            error
            ? res.send(error.message)
            : res.send(results)      
        })
    }
    if (Object.keys(req.query).length > 0) {
        let key = Object.keys(req.query)[0].concat('_id');
        let value = Object.values(req.query)[0];
        mysqlCon.query('SELECT * FROM songs WHERE id != ? AND ?? = ?', [req.params.id, key, value], (error, results) => {
            error
            ? res.send(error.message)
            : res.send(results)      
        })
    } else {
        mysqlCon.query('SELECT * FROM songs WHERE id = ?', [req.params.id], (error, results) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
        });
    }
});

/* get album from sql by id or name */
app.get('/albums/:id', async (req, res) =>{
    mysqlCon.query('SELECT * FROM albums WHERE id = ?',[req.params.id], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});


app.get('/artists/:id', async (req, res) =>{
    mysqlCon.query('SELECT * FROM artists WHERE id = ?',[req.params.id], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.get('/playlists/:id', async (req, res) =>{
    mysqlCon.query('SELECT * FROM playlists WHERE id = ?',[req.params.id], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});

// ----

app.post('/songs', async (req, res) =>{
    mysqlCon.query('INSERT INTO songs SET ?',req.body, (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});

app.post('/playlists', async (req, res) =>{
    mysqlCon.query('INSERT INTO playlists SET ?',req.body, (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.post('/artists', async (req, res) =>{
    mysqlCon.query('INSERT INTO artists SET ?',req.body, (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.post('/albums', async (req, res) =>{
    mysqlCon.query('INSERT INTO albums SET ?',req.body, (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});

// ---

app.put('/songs/:id', (req, res) =>{
    mysqlCon.query(`UPDATE songs SET ? WHERE id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

app.put('/playlists/:id', (req, res) =>{
    mysqlCon.query(`UPDATE playlists SET ? WHERE id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

app.put('/artists/:id', (req, res) =>{
    mysqlCon.query(`UPDATE artists SET ? WHERE id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

app.put('/albums/:id', (req, res) =>{
    mysqlCon.query(`UPDATE albums SET ? WHERE id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});



// ----

app.delete('/songs/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM songs WHERE id = ?',[req.params.id], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.delete('/albums/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM albums WHERE id = ?',[req.params.id], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.delete('/artists/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM artists WHERE id = ?',[req.params.id], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.delete('/playlists/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM playlists WHERE id = ?',[req.params.id], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});

app.listen(3001);