const modelCart = require('../models/carts');

class CartController {
    cartPage = (req, res) => {
        res.render('cart');
    }

    postCartPage = async (req, res) => {
        if (req.session.emailDataSession && req.session.emailDataSession.idUser) {
            let skuAndSize = req.body.skuAndSize;
            let infoLogin = req.session.emailDataSession.idUser;
            let quantitySize = req.body.quantity;
            let checkDataSize = [infoLogin, skuAndSize]

            let resultCheckCart = await modelCart.checkAddCart(checkDataSize)


            if (resultCheckCart.length == 0) {
                let dataSize = {
                    userID: infoLogin,
                    productSizesID: skuAndSize,
                    quantityCart: quantitySize
                }
                await modelCart.addCart(dataSize);
            } else {
                if (resultCheckCart[0].quantityCart == resultCheckCart[0].quantityProductSize) {
                    let upSizeCartPlus = [{ quantityCart: resultCheckCart[0].quantityCart }, { idCarts: resultCheckCart[0].idCarts }]
                    await modelCart.upSizeCart(upSizeCartPlus)
                } else {
                    let upSizeCartPlus = [{ quantityCart: ++resultCheckCart[0].quantityCart }, { idCarts: resultCheckCart[0].idCarts }]
                    await modelCart.upSizeCart(upSizeCartPlus)
                }
            }
            res.redirect('cart');
        } else {
            let fullUrl = req.body.custId;
            console.log('getUrddddil', fullUrl)
            res.redirect(fullUrl);
        }
    }



}


module.exports = new CartController;