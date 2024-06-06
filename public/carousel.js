// public/carousel.js
function prevImage(id) {
    const carousel = document.getElementById(`carousel-${id}`);
    const items = carousel.getElementsByClassName('carousel-item');
    for (let i = 0; i < items.length; i++) {
        if (items[i].style.display !== 'none') {
            items[i].style.display = 'none';
            items[(i - 1 + items.length) % items.length].style.display = '';
            break;
        }
    }
}

function nextImage(id) {
    const carousel = document.getElementById(`carousel-${id}`);
    const items = carousel.getElementsByClassName('carousel-item');
    for (let i = 0; i < items.length; i++) {
        if (items[i].style.display !== 'none') {
            items[i].style.display = 'none';
            items[(i + 1) % items.length].style.display = '';
            break;
        }
    }
}
