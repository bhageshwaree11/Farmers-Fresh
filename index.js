// Login form Starts
const loginOpnBtn = document.querySelector("#button-openform");
const loginBox = document.querySelector(".container-login");
const signupOpnBtn = document.querySelector(".button-login-signup");
const signupBox = document.querySelector(".container-signup");
const closebtn = document.querySelector(".closeButton");
const closebtnSignUp =document.querySelector(".closeButtonSignup");
const forgetPWLin =document.querySelector(".forgetPWLink");
const forgetP =document.querySelector(".forgetPW");
const closeButtonForgetP =document.querySelector(".closeButtonForgetPW")
const shop = document.getElementById("shop");


// Initialize the basket with empty data or data from localStorage
let basket = JSON.parse(localStorage.getItem("data")) || [];



// Function to generate the shop items
// Generate the shop items dynamically
let generateShop = () => {
    return (shop.innerHTML = shopItemData.map((x) => {
        let {id, name, price, img} = x;
        let search = basket.find((y)=>y.id ===id) || [];
   return `
    <div id=product-id-${id} class="product-item">
            <img width="200px" height="200px" src=${img} alt="">
            <div class="productLable"><p>${name} <img width="15px" src="images/veg.svg" alt=""></p>
          
            <div class="productPrice">₹ ${price} per Kg
            <div class="productQty">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
                search.item === undefined ? 0 : search.item
              }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i></div>
            <div class="Note"><p><i class="bi bi-truck"></i> Standard Delivery: Today 7.00AM-9.00AM</p></div>
            </div>
            </div>
        </div>`;
    })
    .join(""));
};
generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined)
    {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));

}



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
    // console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
  };




// Update the quantity display
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

// Calculate and update the cart icon
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    const totalItems = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    
    cartIcon.innerHTML = `${totalItems} ${totalItems === 1 ? 'Item' : 'Items'}`;
  };
  


calculation();





// login form Starts
loginOpnBtn.addEventListener("click", function () {
    if (loginBox.style.display === "none" || loginBox.style.display === "") {
        loginBox.style.display = "block";
    } else {
        loginBox.style.display = "none";
    }
});

signupOpnBtn.addEventListener("click", function (event) {
    event.preventDefault(); 
    if (signupBox.style.display === "none" || signupBox.style.display === "") {
        signupBox.style.display = "block";
    } else {
        signupBox.style.display = "none";
    }
    loginBox.style.display = "none";
});


forgetPWLin.addEventListener("click", function (event) {
    event.preventDefault(); 
    if (forgetP.style.display === "none" || forgetP.style.display === "") {
        forgetP.style.display = "block";
    } else {
        forgetP.style.display = "none";
    }
    loginBox.style.display = "none";
    signupBox.style.display = "none"
});

closebtn.addEventListener("click", function () {
    if(loginBox.style.display === "block")
    {
        loginBox.style.display = "none";
       
    }
})

closebtnSignUp.addEventListener("click", function(){
    if(signupBox.style.display === "block")
    {
        signupBox.style.display = "none";
    }
})

closeButtonForgetP.addEventListener("click", function(){
    if(forgetP.style.display === "block")
    {
        forgetP.style.display = "none";
    }
})
// Login Form Ends


