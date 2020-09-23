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
    mysqlCon.query('SELECT * FROM artists;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
})
.post((req, res) => {
    mysqlCon.query('INSERT INTO artists SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* Get an artist by id */
router.route('/:id')
.get((req, res) => {
    mysqlCon.query(
        `SELECT * FROM artists WHERE Artist_id = ?`, req.params.id, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
})
.put((req, res) =>{
    mysqlCon.query(`UPDATE artists SET ? WHERE Artist_id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
})
.delete((req, res) =>{
    mysqlCon.query(`DELETE FROM artists WHERE Artist_id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});


module.exports = router;