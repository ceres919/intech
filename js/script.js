const rootProducts = document.getElementById('itemsList');
const rootHeader = document.getElementById('shoppingCartSection');
const rootShopping = document.getElementById('shoppingCartSumHolder');
const womenList = document.getElementById('womenCatalog');
const menList = document.getElementById('menCatalog');
const staffList = document.getElementById('staffCatalog');

//localStorage start 
class LocalStorageUtil {
	constructor(){
		this.keyName = 'products';
	}	
	getProducts() {
		const productsLocalStorage = localStorage.getItem(this.keyName);
		if (productsLocalStorage !== null) {
			return JSON.parse(productsLocalStorage);
		}
		return [];
	}
	putProducts(id) {
		let products = this.getProducts();
		products.push(id);
		localStorage.setItem(this.keyName, JSON.stringify(products));
		return products;
	}
}

const localStorageUtil = new LocalStorageUtil();

//localStorage end

//catalog start

class Products {

	handleSetLocationStorage(element, id) {

		headerPage.render(localStorageUtil.putProducts(id).length);
		
	}
	
	render(nowCatalog) {
		
		let htmlCatalog = '';
		nowCatalog.forEach(({id, img, itemName, price}) => {
			htmlCatalog +=  `
			<div class="item">
				<div class="item_img_set">
					<img src="${img}" alt="cat1" class="item_img">
				</div>
				<div class="item_name">
					${itemName}
				</div>
				<div class="item_cost">
					<div class="cost">${price}</div>
					<div class="rub">rub</div>
				</div>
				<button class="button-buy" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
					buy
					<svg>
						<rect></rect>
					</svg>
				</button>
			</div>
			`;
		});

		rootProducts.innerHTML = htmlCatalog;
		
	}
}

const productsPage = new Products();
let autoCatalog = catalog.filter(item => {
	if(item.ind <= 6)
	return true
});
productsPage.render(autoCatalog);

womenList.addEventListener('click', () => {

	rootProducts.innerHTML = '';
    let nowCatalog = catalog.filter(item => {
		if(item.ind <= 6)
		return true
	});
	productsPage.render(nowCatalog);

});

menList.addEventListener('click', () => {

	rootProducts.innerHTML = '';
    let nowCatalog = catalog.filter(item => {
		if(item.ind >= 7 && item.ind <= 12)
		return true
	});
	productsPage.render(nowCatalog);

});

staffList.addEventListener('click', () => {

	rootProducts.innerHTML = '';
    let nowCatalog = catalog.filter(item => {
		if(item.ind >= 13 && item.ind <= 18)
		return true
	});
	productsPage.render(nowCatalog);

});
//catalog end


//counters start
class Header {
	
	render(count) {
		const productsStore = localStorageUtil.getProducts();
		let sumItemsCost = 0;
		catalog.forEach (({id, price}) => {
			if (productsStore.indexOf(id) !== -1) {
				let prePrice = productsStore.filter(item => {
					if(item == id)
					return true;
				});
				sumItemsCost += price * prePrice.length;
			}
		});
		const html = `
        <div id='shoppingCart' class="shopping_cart_wrapper">
            <a href="#!" class="shopping_cart_link">
                <img src="./img/shopping-cart(1).svg" alt="cart" class="shopping_cart_pic">
            </a>
            <div class="shopping_cart_count_ell">
                <span class="shopping_cart_count_num" id="items-count">${count}</span>
            </div>
            <div id="shoppingCartSumHolder"class="shopping_cart_sum_ell">
				<span class="shopping_cart_sum_num" id="items-cost">${sumItemsCost}</span>
			</div>
        </div>
		`;
		rootHeader.innerHTML = html;
	}
}

const headerPage = new Header();
const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);

//counters end