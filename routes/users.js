var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

// cart

router.get('/apishowcart', userController.apiShowCart)
router.patch('/apichangeSizeCart/:idCart', userController.apichangeSizeCart)
router.delete('/apideletecart/:idCart', userController.apiDeleteCart)


router.get('/searchproduct', userController.searchProduct)


// sizes
router.get('/size', userController.listSize)

// categories
router.post('/categories', userController.createCategory)

// images
router.get('/image', userController.image)
router.post('/image', userController.createImage);


// footwear
router.get('/:footwear', userController.listFootwear)


// product
router.get('/products/:slug', userController.readProduct)
// /
// router.use('/', userController.index);
module.exports = router;