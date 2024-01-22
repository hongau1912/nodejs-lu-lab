const apiShowCart = '/users/apishowcart';
const apiImage = '/users/image';
const apiSize = '/users/size';

function start() {
    getCart(renderCart);
}
start();

async function getCart(callback) {
    try {
        const response = await axios.get(apiShowCart);
        const responseImage = await axios.get(apiImage);
        const responseSize = await axios.get(apiSize);
        const responseData = response.data;
        const responseDataImage = responseImage.data;
        const responseDataSize = responseSize.data;
        callback(responseData, responseDataImage, responseDataSize)
    } catch (error) {
        console.error(error);
    }
}
function formatVnd(price, quantityCart) {
    let resultPrice = price * quantityCart;
    return resultPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}


function showSize(courseSize, idProduct, sizeName) {
    let showSizes = courseSize.filter((size) => size.productID == idProduct);
    let newShowSize = [];
    for (let i = 0; i < showSizes.length; i++) {
        if (showSizes[i].size == sizeName) {
            newShowSize.push(showSizes[i]);
            showSizes.splice(i, 1);
            break;
        }
    }

    let concactShowSize = newShowSize.concat(showSizes);

    let showHTML = concactShowSize.map((e) => {
        return `<option value="${e.idProductSize}">${e.size}</option>`;
    })
    return showHTML.join('')
}


function showQuantity(quantityProductSize, quantityCart) {
    let arrQuantityProductSizes = [];
    let newQuantityCart = []
    for (let i = 1; i <= quantityProductSize; i++) {
        arrQuantityProductSizes.push(i)
    }

    for (let i = 0; i < arrQuantityProductSizes.length; i++) {
        if (arrQuantityProductSizes[i] == quantityCart) {
            newQuantityCart.push(arrQuantityProductSizes[i])
            arrQuantityProductSizes.splice(i, 1);
            break;
        }
    }

    let newShowQuantity = newQuantityCart.concat(arrQuantityProductSizes);

    let HTMLQuantity = newShowQuantity.map((i) => {
        return `<option value="${[i]}">${[i]}</option>`
    });
    return HTMLQuantity.join('')

}


async function patchSize(idCart, valueCartSize) {

    await axios.patch(`/users/apichangeSizeCart/${idCart}`, {
        productSizesID: valueCartSize,
        quantityCart: 1
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    getCart(renderCart);
}

async function patchQuantity(idCart, valueQuantityChange) {
    await axios.patch(`/users/apichangeSizeCart/${idCart}`, {
        quantityCart: valueQuantityChange
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

async function handleCheckDeletCart(callback) {
    try {
        const response = await axios.get(apiShowCart);
        const responseData = response.data;
        callback(responseData)
    } catch (error) {
        console.error(error);
    }
}



function sizeSelectChange(idCart) {
    let valueCartSize = document.getElementById(`sizeSelect_${idCart}`).value;

    handleCheckDeletCart((responseData) => {
        let resultResponseData = responseData.filter((obj) => obj.productSizesID == valueCartSize);
        if (resultResponseData.length === 0) {
            patchSize(idCart, valueCartSize)
        } else {
            deleteCart(idCart);
        }
    });

}



function quantityChange(idCart) {
    let valueQuantityChange = document.getElementById(`quantity_${idCart}`).value;
    patchQuantity(idCart, valueQuantityChange)
    getCart(renderCart);

}

async function deleteCart(idCart) {
    await axios.delete(`/users/apideletecart/${idCart}`, {
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    getCart(renderCart);
}

function renderCart(course, courseImage, courseSize) {
    let listCart = document.querySelector('#listCart');
    getTotalCart(course)
    if (course.length > 0) {
        const cartItemsHTML = course.map((e) => {
            let foundImage = courseImage.find((obj) => obj.productID == e.idProduct);
            return `
            <div class="cart-item">
                <div>
                    <a href="/product/detail/${e.slug}"><img class="detail-img-in" src="/images/product/${foundImage.image}" alt=""></a>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-info-text">
                        <div>
                            <div class="cart-item-info-textmg"><a class="cart-item-product-name" href="/product/detail/${e.slug}">${e.productName}</a></div>
                            <div class="cart-item-product-sup">${e.nameCategory}</div>
                            <div style="display: flex;" class="cart-item-product-sup">
                                <label for="sizeSelect">Size</label>
                                <select id="sizeSelect_${e.idCarts}" onchange="sizeSelectChange(${e.idCarts})" class="css-select">
                                    ${showSize(courseSize, e.idProduct, e.size)}
                                </select>
                                <strong class="px-2">/</strong>
                                <label for="quantity">Quantity</label>
                                <select class="css-select" onchange="quantityChange(${e.idCarts})" name="quantity" id="quantity_${e.idCarts}">
                                    ${showQuantity(e.quantityProductSize, e.quantityCart)}
                                </select>
                            </div>
                        </div>
                        <div class="total-price-pay cart-item-product-name">
                            ${formatVnd(e.price, e.quantityCart)}
                        </div>
                    </div>
                    <div class="cart-item-info-trash">
                        <div id="deleteCart_${e.idCarts}" onclick="deleteCart(${e.idCarts})" class="cart-item-right">
                            <i class="bi bi-trash css-big-strash"></i>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        listCart.innerHTML = cartItemsHTML.join('');
    } else {
        listCart.innerHTML = `
            <div style="background-color: #d9edf7; padding: 10px 20px;">
                <i style="color: #31708f; font-size: 19px;"
                    class="bi bi-exclamation-triangle-fill">Notification!</i>
                <p style="color: #31708f;">There is no data.</p>
            </div>
        `
    }
}
function formatVndCart(price) {
    return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}
function getTotalCart(course) {
    let mapPrice = course.map((cart) => cart.price * cart.quantityCart);
    let idTotalPrice = document.getElementById('total-price');
    let estimatedShip = document.getElementById('estimated-ship')
    let totalPay = document.getElementById('total-pay');
    const initialValue = 0;
    if (mapPrice.length == 0) {
        estimatedShip.innerHTML = 'Free'
        totalPay.innerHTML = '-';
        idTotalPrice.innerHTML = '-';
    }
    else if (mapPrice.length > 1) {
        const sumWithInitial = mapPrice.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );
        estimatedShip.innerHTML = 'Free';
        idTotalPrice.innerHTML = formatVndCart(sumWithInitial)
        totalPay.innerHTML = formatVndCart(sumWithInitial);
    }
    else {
        if (course[0].quantityCart > 1) {
            const sumWithInitial = mapPrice.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue,
            );
            estimatedShip.innerHTML = 'Free'
            idTotalPrice.innerHTML = formatVndCart(sumWithInitial)
            totalPay.innerHTML = formatVndCart(sumWithInitial);

        } else {
            const codeShip = 65000;
            let shipCart = formatVndCart(codeShip)
            const sumWithInitial = mapPrice.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue,
            );
            const sumWithInitials = mapPrice.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                codeShip,
            );
            estimatedShip.innerHTML = shipCart;
            idTotalPrice.innerHTML = formatVndCart(sumWithInitial)
            totalPay.innerHTML = formatVndCart(sumWithInitials);
        }


    }
}

