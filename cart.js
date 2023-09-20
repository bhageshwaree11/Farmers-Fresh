let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
const cartItems = document.getElementById("cart-items");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  const totalItems = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  
  cartIcon.innerHTML = `${totalItems} ${totalItems === 1 ? 'Item' : 'Items'}`;
};



calculation();


let generateCartItems = () => {
  if (basket.length !== 0) {
    return (cartItems.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        return `
       <table>
<tr>
   <td> <div class="itemImg" id="itemImg"><img width ="100px" height ="100px" src="${search.img}" alt=""></div></td> 
   <td><div class="itemName" id="itemName">${search.name}</div></td>    
   <td><div class="itemPrice" id="itemPrice">${search.price}</div></td>
   <td class="decrement"><i onclick="decrement(${id})" class="bi bi-dash-lg"></i></td>
   <td><div class="itemQty" id="${id}">${item}</div></td>
   <td class="increment"><i onclick="increment(${id})" class="bi bi-plus-lg"></i></td>
   <td class="remove"><i onclick="removeItem(${id})" class="bi bi-x-lg"></i></td>
        <td class="itemAmount" id="itemAmount">${item * search.price}</td>
</tr> 
</table>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill ₹ ${amount}</h2>
    
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

TotalAmount();