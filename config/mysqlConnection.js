const mysql = require('mysql');
connection = mysql.createConnection({
    host:'localhost',
    user:'betting',
    password:'betting_2018%',
    database:'betting'
});

module.exports = connection;