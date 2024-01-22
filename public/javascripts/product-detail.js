Promise.all([
    axios.get(itemDetail),
    axios.get(image),
    axios.get(size)
])
    .then(function (response) {
        // xử trí khi thành công
        console.log(response[0]);
        console.log(response[1]);
        console.log(response[2]);
        const productData = response[0].data[0];
        const productImage = response[1].data;
        const productSize = response[2].data;
        document.getElementById('nameProduct').innerHTML = productData.productName.toUpperCase();
        document.getElementById('nametitle').innerHTML = productData.productName;

        let idProduct = productData.idProduct;
        let foundImage = productImage.find(obj => obj.productID == idProduct);
        let foundSize = productSize.filter(obj => obj.productID == idProduct);
        console.log('fasda', foundSize)

        document.getElementById('show-image-full').innerHTML = `
            <div>
                ${foundImage.image !== null ? `<img class="detail-img-in" src="/images/product/${foundImage.image}" alt="">` : ''}
            </div>
            <div>
                ${foundImage.image1 !== null ? `<img class="detail-img-in" src="/images/product/${foundImage.image1}" alt="">` : ''}
            </div>
            <div>
                ${foundImage.image2 !== null ? `<img class="detail-img-in" src="/images/product/${foundImage.image2}" alt="">` : ''}
            </div>
        `;

        document.getElementById('detail__desc--intro').innerHTML = `
        <p class="title__detailproduct">DETAIL</p>
        <div class="title__detailproduct-sku">
            <p><span>SKU</span> ${productData.description}</p>
            <p>${productData.productName}</p>
            <p>${formatPrice(productData.price)}</p>
        </div>
        `
        foundSize.forEach(e => {
            if (e.quantityProductSize != 0) {
                document.getElementById('show-size-detail').innerHTML += `
                    <input value="${e.idProductSize}" id="skuAndSize${e.idProductSize}" name="skuAndSize" type="radio" class="visually-hidden">
                    <label onclick="chooseSize(${e.idProductSize})" for="skuAndSize${e.idProductSize}" class="css-boder css-boderId${e.idProductSize}">${e.size}</label>
                `
            }
        });

    })
    .catch(function (error) {
        // xử trí khi bị lỗi
        console.log(error);
    })

// class="visually-hidden"
function getUrlReload() {
    const currentUrl = window.location.href;
    return document.getElementById('custId').value = currentUrl;
    console.log('a', a)
}
getUrlReload()

function formatPrice(price) {
    return price.toLocaleString('vi-VN', { currency: 'VND', style: 'currency' });
}

function chooseSize(idSize) {
    let val = document.querySelectorAll('.css-boder');
    for (i = 0; i < val.length; i++) {
        val[i].classList.remove('add-choose');
    }
    document.querySelector(`.css-boderId${idSize}`).classList.add('add-choose');
}





// function start() {
//     getDetail(renderDetail);
// }
// start()

// async function getDetail(callback) {
//     try {
//         const response = await axios.get(itemDetail);
//         const responseData = response.data;
//         callback(responseData)
//     } catch (error) {
//         console.error(error);
//     }
// }
// function renderImage(data) {
//     let idRenderImage = document.getElementById('show-image-full');
//     idRenderImage.innerHTML = `
//         <div>
//             ${data[0].image !== null ? `<img class="detail-img-in" src="/images/product/${data[0].image}" alt="">` : ''}
//         </div>
//         <div>
//             ${data[0].image1 !== null ? `<img class="detail-img-in" src="/images/product/${data[0].image1}" alt="">` : ''}
//         </div>
//         <div>
//             ${data[0].image2 !== null ? `<img class="detail-img-in" src="/images/product/${data[0].image2}" alt="">` : ''}
//         </div>
//     `
// }

// function renderSize(data) {
//     let idRenderSize = document.getElementById('show-size-detail');
//     let renderSize = data.map((e) => {
//         return `
//             <input value="${e.idProductSize}" id="skuAndSize${e.idProductSize}" name="skuAndSize" type="radio" class="visually-hidden">
//             <label onclick="chooseSize(${e.idProductSize})" for="skuAndSize${e.idProductSize}" class="css-boder css-boderId${e.idProductSize}">${e.size}</label>
//         `
//     })
//     idRenderSize.innerHTML = renderSize.join('')
// }

// function renderDetailText(data) {
//     document.getElementById('nameProduct').innerHTML = data[0].productName.toUpperCase();
//     document.getElementById('nametitle').innerHTML = data[0].productName;
//     document.getElementById('detail__desc--intro').innerHTML = `
//         <p class="title__detailproduct">DETAIL</p>
//         <div class="title__detailproduct-sku">
//             <p><span>SKU</span> ${data[0].description}</p>
//             <p>${data[0].productName}</p>
//             <p>${formatPrice(data[0].price)}</p>
//         </div>
//         `
// }
// function renderDetail(data) {
//     renderSize(data)
//     renderImage(data)
//     renderDetailText(data)
// }
// function chooseSize(idSize) {
//     let val = document.querySelectorAll('.css-boder');
//     for (i = 0; i < val.length; i++) {
//         val[i].classList.remove('add-choose');
//     }
//     document.querySelector(`.css-boderId${idSize}`).classList.add('add-choose');
// }
// function formatPrice(price) {
//     return price.toLocaleString('vi-VN', { currency: 'VND', style: 'currency' });
// }






