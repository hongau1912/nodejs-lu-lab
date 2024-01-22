const usersFootwear = '/users/footwear';
const usersApparel = '/users/apparel';

function getStar() {
    getCart(renderCart)
}
getStar()

async function getCart(callback) {
    try {
        const response = await axios.get(usersFootwear);
        const response1 = await axios.get(usersApparel);
        const responseData = response.data;
        const responseData1 = response1.data;
        callback(responseData, responseData1)
    } catch (error) {
        console.error(error);
    }
}

function formatPrice(price) {
    return price.toLocaleString('vi-VN', { currency: 'VND', style: 'currency' });
}
function renderCart(data, data1) {
    renderFootwear(data)
    renderApprel(data1)
}

function renderFootwear(data) {
    let products = document.getElementById('list-footwear');
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

function renderApprel(data1) {
    let apparel = document.getElementById('list-apparel');
    let mapProduct = data1.map((eProduct) => {
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
    apparel.innerHTML = mapProduct
}
