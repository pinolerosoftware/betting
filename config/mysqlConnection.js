const mysql = require('mysql');
connection = mysql.createConnection({
    host:'localhost',
    user:'betting',
    password:'%pinolero_software$',
    database:'betting'
});

module.exports = connection;