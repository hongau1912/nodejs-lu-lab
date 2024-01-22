var connectionDatabase = require('./connection-database');


exports.createUser = (data, callback) => {
    let sql = 'INSERT INTO users SET ?';
    connectionDatabase.query(sql, data, (err, d) => {
        if (err) throw err;
        callback(d);
    })
}

// exports.readUser = (callback) => {
//     let sql = 'SELECT * FROM users';
//     connectionDatabase.query(sql, (err, data) => {
//         if (err) throw err;
//         callback(data)
//     })
// }

exports.readUser = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM users';
        connectionDatabase.query(sql, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
