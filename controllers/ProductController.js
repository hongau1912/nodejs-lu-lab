class ProductController {

    // [GET] product 
    index = (req, res) => {
        let slug = req.params.slug;
        if (slug) {
            res.render('product', { slug: slug })
        } else {
            res.render('product', { slug: 'products' })

        }
    }
    // [GET] :slug
    detail = (req, res) => {
        let slug = req.params.slug;
        res.render('product-detail', { slug: slug })
    }
}

module.exports = new ProductController;