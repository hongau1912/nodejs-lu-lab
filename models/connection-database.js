var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lu_lab'
});

connection.connect();

module.exports = connection;
