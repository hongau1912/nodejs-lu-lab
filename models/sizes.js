var connectionDatabase = require('./connection-database');


exports.readSize = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM productSizes JOIN sizes ON productSizes.sizeID = sizes.idSize'
        connectionDatabase.query(sql, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

