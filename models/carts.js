var connectionDatabase = require('./connection-database');

exports.upSizeCart = (upSizeCartPlus) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE carts SET ? WHERE ?`
        connectionDatabase.query(sql, upSizeCartPlus, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

exports.checkAddCart = (checkDataSize) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM carts INNER JOIN productSizes ON carts.productSizesID = productSizes.idProductSize WHERE carts.userID = ? AND carts.productSizesID = ?;`
        connectionDatabase.query(sql, checkDataSize, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

exports.addCart = (dataAdd) => {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO carts SET ?'
        connectionDatabase.query(sql, dataAdd, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

exports.apiShowCart = (UserLogin) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM carts INNER JOIN users ON carts.userID = users.idUser INNER JOIN productSizes ON carts.productSizesID = productSizes.idProductSize INNER JOIN products ON productSizes.productID = products.idProduct INNER JOIN sizes ON productSizes.sizeID = sizes.idSize INNER JOIN categories ON products.categoryID = categories.idCategory WHERE userID = ?'
        connectionDatabase.query(sql, UserLogin, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.apiChangeCart = (filedData, idCart) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE carts SET ? WHERE idCarts = ?`
        connectionDatabase.query(sql, [filedData, idCart], (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.apiDeleteCartDb = (idCart) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM carts WHERE idCarts = ?`;
        connectionDatabase.query(sql, idCart, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}