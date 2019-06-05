class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.init();
        this.countPrice();
    }
    init(){
        this._fetchProducts();
        this._render();
    }
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 75},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
    countPrice(){
        let price = this.allProducts.reduce((sum, item) => sum + item.price, 0);
        /*
        let price = 0;
        for (let item of this.allProducts){
            price += item.price;
        }
        */
        console.log(`Общая стоимость товаров в каталоге равна ${price} у.е`)
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
}
class Cart {
    constructor(container = '.cart'){
        this.container = container;
        this.products = [
            {id: 1, title: 'Notebook', price: 2000,},
            {id: 2, title: 'Mouse', price: 30, },
            {id: 3, title: 'Keyboard', price: 55,},
            {id: 4, title: 'Gamepad', price: 75,},
        ]; // Состав корзины
        this.init();
    }
    init(){
        this._render();
    }
    _addProduct(){ // Добавить товар в корзину

    }
    _deleteProduct(){ // Удалить товар из корзины

    }
    _countQuantity(){ // Подсчет количества товаров в корзине
        return  this.products.reduce((sum, item) => sum + item.quantity, 0);
        // console.log(`Общая стоимость товаров в каталоге равна ${price} у.е`);
    }
    _countPrice(){ // Подсчет стоимости товаров в корзине
        return this.products.reduce((sum, item) => sum + item.totalPrice, 0);
        // console.log(`Общая стоимость товаров в корзине равна ${price} у.е`);
    }

    _render(){ // Прорисовка корзины
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML('beforeend',
            `<div class="product-item-cart">
                 <img src="" alt="Картинка товара">
                 <div class="desc-cart">
                     <h3>Наименование</h3>
                     <p>Стоимость</p>
                     <p>Количество</p>
                     <p>Стоимость всего</p>
                 </div>
             </div>`);
        for (let item of this.products){
            const product = new ProductItemToCart(item);
            this.products[this.products.indexOf(item)] = product;
            block.insertAdjacentHTML('beforeend', product.render());
        }
        if (this.products == 0)
            block.innerHTML = 'Корзина пуста';
        else block.insertAdjacentHTML('beforeend', `<p>Вы выбрали ${this._countQuantity()} товаров на сумму ${this._countPrice()} у.е.`);
    }
}

class ProductItemToCart {
    constructor(product, quantity = 1, img = `https://placehold.it/20x20`) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img; // Уменьшенное изображение товара
        this.quantity = quantity; // Количество этого товара в корзине
        this.totalPrice = this.price * this.quantity; // Общая стоимость товара в корзине с учетом количества
    }

    changeQuantity(){ // Изменяет количество товара
    }
    render(){
        return `<div class="product-item-cart">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc-cart">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <input type="number" class="" value="${this.quantity}">
                     <p>${this.totalPrice}</p>
                     <button class="del-btn">Удалить</button>
                 </div>
             </div>`
    }
}


const products = new ProductsList();
let cart = new Cart();

// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 30},
//     {id: 3, title: 'Keyboard', price: 55},
//     {id: 4, title: 'Gamepad', price: 65},
// ];
//
// const renderProduct = (title, price, img = `https://placehold.it/200x150`) => {
//     return `<div class="product-item">
//                  <img src="${img}" alt="${title}">
//                  <div class="desc">
//                      <h3>${title}</h3>
//                      <p>${price}</p>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
// };
//
// const renderPage = list => {
//     // document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
//     for (let product of list){
//         document.querySelector('.products').insertAdjacentHTML('beforeend', renderProduct(product.title, product.price));
//     }
// };
//
// renderPage(products);