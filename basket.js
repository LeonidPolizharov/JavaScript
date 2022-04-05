'use strict';

document.querySelector('.cartIconWrap').addEventListener('click', (event) => {
    document.querySelector('.basket').classList.toggle('hidden');
});

const basket = {};
const basketCnt = document.querySelector('.cartIconWrap span');
const basketSum = document.querySelector('.basketTotalValue');
const basketTotal = document.querySelector('.basketTotal');

document.querySelector('.featuredItems').addEventListener('click', (event) => {
    if (!event.target.classList.contains('addToCart')) {
        return;
    }
    const headAttr = event.target.closest('.featuredItem').attributes;
    //console.log(headAttr);
    addToCart(headAttr);
});

function addToCart(arr) {
    //console.log(arr[1].value);
    //console.log(arr[2].value);
    //console.log(arr[3].value);

    if (arr[1].value in basket) {
        basket[arr[1].value].count += 1;
    } else {
        basket[arr[1].value] = {id: arr[1].value, 
                    name: arr[2].value, 
                    price: +arr[3].value,
                    count: 1};
    }

    basketCnt.textContent = getBasketCnt();
    basketSum.textContent = getBasketSum();
    putToBasket(arr[1].value);
}


function getBasketCnt() {
    let cnt = 0;
    Object.values(basket).forEach((elem) => {
        cnt += elem.count;
    });
    return cnt;
}


function getBasketSum() {
    let summary = 0;
    Object.values(basket).forEach((elem) => {
        summary += elem.count * elem.price;
    });
    return summary;
}

function putToBasket(prodId) {
    const basketEl = document.querySelector(`.basketRow[data-id="${prodId}"]`);
    if (!basketEl) {
        putNewToBasket(prodId);
        return;
    }

    const prod = basket[prodId];
    basketEl.querySelector('.productCount').textContent = prod.count;
    basketEl.querySelector('.productTotalRow').textContent = (prod.price * prod.count);
}

function putNewToBasket(prodId) {
    const prod = `
        <div class="basketRow" data-id="${prodId}">
            <div>${basket[prodId].name}</div>
            <div>
                <span class="productCount">${basket[prodId].count}</span>
            </div>
            <div>${basket[prodId].price}</div>
            <div>
                <span class="productTotalRow">${basket[prodId].price * basket[prodId].count}</span>
            </div>
        </div>
    `;
    basketTotal.insertAdjacentHTML("beforebegin", prod);
}