function getStar() {
    getCart(renderCart)
}
getStar()

async function getCart(callback) {
    try {
        const response = await axios.get(apiProduct);
        const responseData = response.data;
        callback(responseData)
    } catch (error) {
        console.error(error);
    }
}

function formatPrice(price) {
    return price.toLocaleString('vi-VN', { currency: 'VND', style: 'currency' });
}
function renderCart(data) {
    let products = document.getElementById('list-product');
    let mapProduct = data.map((eProduct) => {
        let formattedPriceSale;
        if (eProduct.priceSale === null) {
            formattedPriceSale = formatPrice('');
        } else {
            formattedPriceSale = formatPrice(eProduct.priceSale);
        }

        let priceDecorationClass = 'price-decoration';
        if (eProduct.priceSale == null) {
            priceDecorationClass = '';
        }
        return `
                <div class="col-lg-4 col-md-6">
                <div class="product__item">
                    <div class="product__item--pic">
                        <a href="/product/detail/${eProduct.slug}">
                            <div>
                                <img class="product__img" src="/images/product/${eProduct.image}"
                                    alt="${eProduct.productName}">
                            </div>
                        </a>
                        <div class="product__item--infor">
                            <div class="clearfix">
                                <p class="product-name text-uper">
                                    <a href="">${eProduct.productName}</a>
                                </p>

                                <p class="product-price">
                                    <span class="${priceDecorationClass}" style="padding-right: 10px">${formatPrice(eProduct.price)}</span>
                                    <span>${formattedPriceSale}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    }).join('')
    products.innerHTML = mapProduct
}