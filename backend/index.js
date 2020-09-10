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
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});


app.get('/songs/:idOrTitle', async (req, res) =>{
    mysqlCon.query('SELECT * FROM songs WHERE id = ? OR title LIKE ?',[req.params.idOrTitle,`${req.params.idOrTitle}`], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.post('/song', async (req, res) =>{
    mysqlCon.query('INSERT INTO songs SET ?',req.body, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.put('/song', async (req, res) =>{
    mysqlCon.query('UPDATE songs SET song_name = ?, artist_id = ?, length = ? WHERE song_id = ?',
    [req.body.song_name, req.body.artist_id, req.body.length, req.body.song_id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.delete('/song/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM songs WHERE song_id = ?',[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.listen(3001);