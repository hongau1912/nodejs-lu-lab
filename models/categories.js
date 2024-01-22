var connectionDatabase = require('./connection-database');

exports.create = (data, callback) => {
    let sql = 'INSERT INTO categories SET ?';
    connectionDatabase.query(sql, data, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};

exports.list = (callback) => {
    let sql = ' SELECT * FROM categories';
    connectionDatabase.query(sql, (err, data) => {
        if(err) throw err;
        callback(data);
    })
}