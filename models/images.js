var connectionDatabase = require('./connection-database');

exports.readImage = (callback) => {
    let sql = 'SELECT * FROM images';
    connectionDatabase.query(sql, (err, data) => {
        if(err) throw err;
        callback(data)
    })
}

exports.createImage = (data, callback) => {
    let sql = 'INSERT INTO images SET ?';
    connectionDatabase.query(sql, data, (err, d) => {
        if (err) throw err;
        callback(d);
    })
}