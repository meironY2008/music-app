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
app.get('/songs/:idOrTitle', async (req, res) =>{
    mysqlCon.query('SELECT * FROM songs WHERE id = ? OR title LIKE ?',[req.params.idOrTitle,`${req.params.idOrTitle}`], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});

/* get album from sql by id or name */
app.get('/albums/:idOrname', async (req, res) =>{
    mysqlCon.query('SELECT * FROM albums WHERE id = ? OR Name LIKE ?',[req.params.idOrname,`${req.params.idOrname}`], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});


app.get('/artists/:idOrname', async (req, res) =>{
    mysqlCon.query('SELECT * FROM artists WHERE id = ? OR Name LIKE ?',[req.params.idOrname,`${req.params.idOrname}`], (error, results, fields) => {
        error && res.send(error.message)
        return res.send(results);
      });
});
app.get('/playlists/:idOrname', async (req, res) =>{
    mysqlCon.query('SELECT * FROM playlists WHERE id = ? OR name LIKE ?',[req.params.idOrname,`${req.params.idOrname}`], (error, results, fields) => {
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