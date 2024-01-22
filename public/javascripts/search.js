const searchProduct = '/users/searchproduct';

async function getSearch(callback) {
    try {
        const response = await axios.get(searchProduct);
        const responseData = response.data;
        callback(responseData)
    } catch (error) {
        console.error(error);
    }
}
getSearch(renderSearch)

function formatPrice(price) {
    return price.toLocaleString('vi-VN', { currency: 'VND', style: 'currency' });
}
function renderSearch(data) {
    let products = document.getElementById('list-product');
    let htmlResult;
    const resultSearch = data.filter((nameobj) => {
        return nameobj.productName.toLowerCase().includes(searchProductFn())
    });
    if (resultSearch.length == 0) {
        htmlResult = `<div class="no-product">No Product</div>`
    } else {
        let formattedPriceSale;
        htmlResult = resultSearch.map((eProduct) => {
            if (eProduct.priceSale === null) {
                formattedPriceSale = formatPrice('');
            } else {
                formattedPriceSale = (eProduct.priceSale)
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
                                        <span class="${eProduct.productName}" style="padding-right: 10px">${formatPrice(eProduct.price)}</span>
                                        <span>${formattedPriceSale}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
        }).join('');
    }
    document.getElementById('results').innerHTML = `${resultSearch.length} results`;
    return products.innerHTML = htmlResult;
}


function searchProductFn() {
    return searchInput.toLowerCase();
}