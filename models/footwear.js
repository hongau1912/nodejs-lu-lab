const connectionDatabase = require('./connection-database');

exports.listFootwear = (slugHeader, callback) => {
    let categories;
    switch (slugHeader) {
        case 'features':
            categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
            break;
        case 'products':
            categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
            break;
        case 'footwear':
            categories = [1, 2, 3, 4, 5, 6, 7];
            break;
        case 'apparel':
            categories = [8, 9, 10, 11, 12, 13, 14, 15, 16];
            break;
        case 'newest-sneakers':
            categories = [1];
            break;
        case 'basketball':
            categories = [2];
            break;
        case 'soccer':
            categories = [3];
            break;
        case 'lifestyle':
            categories = [4];
            break;
        case 'gym-training':
            categories = [5];
            break;
        case 'running':
            categories = [6];
            break;
        case 'sandal':
            categories = [7];
            break;
        case 'shorts':
            categories = [8];
            break;
        case 'pants':
            categories = [9];
            break;
        case 'sweaters':
            categories = [10];
            break;
        case 'outerwears':
            categories = [11];
            break;
        case 'shirts':
            categories = [12];
            break;
        case 'long-sleeves':
            categories = [13];
            break;
        case 'hoodies':
            categories = [14];
            break;
        case 'tees':
            categories = [15];
            break;
        case 'jackets':
            categories = [16];
            break;

        default:
            break;
    }

    let sql = 'SELECT * FROM products INNER JOIN images ON products.idProduct = images.id WHERE products.categoryID IN (?)'
    connectionDatabase.query(sql, [categories], (err, data) => {
        if (err) throw err;
        callback(data);
    })

}
