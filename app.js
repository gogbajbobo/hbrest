const mysql = require('mysql');
const debug = require('debug')('hbrest:app');

const express = require('express');

const app = express();
const port = process.env.PORT || 8888;

app.listen(port, () => {
    debug('HomeBudget RESTful API server started on: ' + port);
});

const con = mysql.createConnection({
    host: "localhost",
    user: "hbclient",
    password: "hbclientpass",
    database: "hbdb"
});

con.connect(err => {

    if (err) throw err;
    debug("Connected!");

    const sql = "SHOW TABLES";
    con.query(sql, (err, result) => {

        if (err) throw err;
        debug(result);

    });


});