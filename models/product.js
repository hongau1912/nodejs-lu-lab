const connectionDatabase = require('./connection-database');

exports.readProduct = (slug, callback) => {
    // SELECT * FROM products INNER JOIN images ON products.idProduct = images.id INNER JOIN productSizes ON productSizes.productID = products.idProduct INNER JOIN sizes ON productSizes.sizeID = sizes.idSize WHERE slug = ?
    let sql = 'SELECT * FROM products WHERE slug = ?';
    connectionDatabase.query(sql, slug, (err, data) => {
        if (err) throw err;
        callback(data)
    })
}

exports.searchProductDb = (callback) => {
    let sql = 'SELECT * FROM products INNER JOIN images ON products.idProduct = images.id';
    connectionDatabase.query(sql, (err, data) => {
        if (err) throw err;
        callback(data)
    })
}