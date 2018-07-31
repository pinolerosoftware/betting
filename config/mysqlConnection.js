const mysql = require('mysql');
connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'feliz2016',
    database:'betting'
});

module.exports = connection;