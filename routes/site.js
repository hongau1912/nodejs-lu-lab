var express = require('express');
var router = express.Router();
var siteController = require('../controllers/SiteController');
var cartController = require('../controllers/CartController');


//search
router.get('/search', siteController.search);


// register
router.get('/register', siteController.register);
router.post('/register', siteController.createUser);
// login
router.get('/login', siteController.login);
router.post('/login', siteController.checkLogin);
// logout
router.get('/logout', siteController.logout);


router.get('/seesession', siteController.seeSession);

// cart
router.get('/cart', cartController.cartPage);
router.post('/cart', cartController.postCartPage);


router.get('/', siteController.index);
module.exports = router;