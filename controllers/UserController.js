const modelFootwear = require('../models/footwear');
const modelImage = require('../models/images');
const modelCategory = require('../models/categories');
const modelProduct = require('../models/product');
const modelSize = require('../models/sizes');
const modelCart = require('../models/carts');
class UserController {

    // [GET] db image[0]
    image = (req, res) => {
        modelImage.readImage((data) => {
            res.json(data)
        })
    }

    // post db image
    createImage = (req, res) => {
        let data = req.body
        modelImage.createImage(data, (d) => {
            res.send(d);
        })
    }


    // [GET] db Footwear
    listFootwear = (req, res) => {
        let slugHeader = req.params.footwear;
        modelFootwear.listFootwear(slugHeader, (data) => {
            res.json(data);
        })
    }

    // [POST] db categories

    createCategory = (req, res) => {
        let data = req.body;
        modelCategory.create(data, () => {
            res.json({ message: 'thanh cong' });
        })
    }

    readProduct = (req, res) => {
        let slug = req.params.slug;
        modelProduct.readProduct(slug, (data) => {
            res.json(data)
        })
    }
    searchProduct = (req, res) => {
        modelProduct.searchProductDb((data) => {
            res.json(data)
        })
    }


    // [GET] db size
    listSize = async (req, res) => {
        const data = await modelSize.readSize();
        res.json(data)
    }

    apiShowCart = async (req, res) => {
        if (req.session.emailDataSession && req.session.emailDataSession.idUser) {
            let UserLogin = req.session.emailDataSession.idUser;
            let data = await modelCart.apiShowCart(UserLogin);
            res.json(data)
        }
    }


    //[PATCH] apichangeSizeCart
    apichangeSizeCart = async (req, res) => {
        let getIdCart = req.params.idCart;
        let fileddata = req.body;
        let resultData = await modelCart.apiChangeCart(fileddata, getIdCart)
        res.json(resultData)

    }

    apiDeleteCart = async (req, res) => {
        let getIdCart = req.params.idCart;
        let resultDataQuantity = await modelCart.apiDeleteCartDb(getIdCart);
        res.json(resultDataQuantity);
    }

}

module.exports = new UserController;