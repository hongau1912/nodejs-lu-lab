// Lấy thẻ header
const header = document.getElementById("header");

// Biến để theo dõi trạng thái cuộn chuột
let isScrolling = false;

// Hàm xử lý sự kiện cuộn chuột
function handleScroll() {
    // Nếu đang cuộn chuột
    if (!isScrolling) {
        isScrolling = true;
        header.classList.add("header-hidden"); // Ẩn menu
    }

    // Thiết lập thời gian chờ trước khi hiển thị lại menu sau khi dừng cuộn chuột
    setTimeout(() => {
        isScrolling = false;
        header.classList.remove("header-hidden"); // Hiển thị menu lại
    }, 1000); // Thời gian chờ 1 giây (có thể điều chỉnh)
}
// Gắn sự kiện cuộn chuột vào cửa sổ
window.addEventListener("scroll", handleScroll);

// Bắt đầu bằng cách chọn thẻ a
var myLink = document.getElementById('myLink');

// Thêm sự kiện onclick
myLink.addEventListener('click', function (event) {
    event.preventDefault();

    // Các hành động bạn muốn thực hiện khi click vào thẻ a
    let dropdownInner = document.getElementById('dropdown__inner');
    dropdownInner.classList.toggle('active-login')
});

let mySearch = document.getElementById('my-search');
mySearch.addEventListener('click', function (e) {
    e.preventDefault();
    let checkNone = document.getElementById('check-none-search');
    checkNone.classList.toggle('none-search')
})

let myCloseSearch = document.getElementById('myCloseSearch');
myCloseSearch.addEventListener('click', function () {
    let closeSearch = document.getElementById('check-none-search');
    closeSearch.classList.add('none-search')
})
