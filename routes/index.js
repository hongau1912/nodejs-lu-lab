var express = require('express');
var router = express.Router();
var productRouter = require('./products');
var siteRouter = require('./site');

router.use('/product', productRouter);
router.use('/', siteRouter);

module.exports = router;
