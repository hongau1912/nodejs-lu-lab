var express = require('express');
var router = express.Router();
var productController = require('../controllers/ProductController');


// /
router.get('/detail/:slug', productController.detail);
router.get('/detail', productController.index);
router.get('/:slug', productController.index);
router.get('/', productController.index);
module.exports = router;