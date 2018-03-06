const mysql = require('mysql');
const debug = require('debug')('hbrest:app');

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