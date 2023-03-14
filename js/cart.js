const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let product_container = document.getElementById("product-container");

const orderTheProduct = () => {
  console.log("ORDERING THE PRODUCT");
};

const removeProductFromCart = async (productId) => {
    let responseAfterRemovel=await fetch("http://localhost:9090/removeCartProduct/"+params.user_id+"/"+productId,
    {
        method : "GET"
    }
    )
    if(responseAfterRemovel.status==200){
        window.location="http://localhost:5500/cart.html?user_id="+params.user_id
    }
    else{
        console.log(responseAfterRemovel)
    }
};

let parent_div = document.createElement("div");
parent_div.classList.add("d-flex", "flex-row", "mt-2");
let image_div = document.createElement("div");

image_div.classList.add("col-sm-2");
let inner_image_div = document.createElement("div");

inner_image_div.classList.add("mt-4");
inner_image_div.style = "width: 250px; height: 160px;";

let info_div = document.createElement("div");

info_div.classList.add("col-sm-10", "border", "rounded", "pb-2", "me-2");
info_div.style = "background-color: #EDF1D6;";
let headline = document.createElement("h4");

headline.classList.add("ms-3", "mt-4");
headline.style = "font-weight: bold;";
let product_info = document.createElement("p");

product_info.classList.add("ms-3");
let price = document.createElement("h3");

price.classList.add("ms-3", "mt-2");

let button1 = document.createElement("button");
button1.classList.add("btn", "btn-dark", "ms-3", "mt-2", "px-4");
button1.textContent = "Order";

let button2 = document.createElement("button");

button2.classList.add("btn", "btn-danger", "ms-3", "mt-2", "px-3");
button2.textContent = "Remove";

const getUserCartProducts = async () => {
  let productsInUserCart = await fetch(
    "http://localhost:9090/updateCartList/" +
      params.user_id +
      "/" +
      params.product_id,
    {
      method: "GET",
    }
  );
  if (productsInUserCart.status == 200) {
    // SHOW THE PRODUCTS TO THE USER PRESENT IN ITS CART
    let jsonResponse = await productsInUserCart.json();
    for (let i in jsonResponse.data) {
      document
        .getElementById("products-container")
        .appendChild(parent_div.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.appendChild(image_div.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.appendChild(info_div.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.firstElementChild.appendChild(
          inner_image_div.cloneNode()
        );
      document.getElementById(
        "products-container"
      ).lastElementChild.firstElementChild.firstElementChild.innerHTML =
        '<img src="images/' +
        jsonResponse.data[i].image_id +
        '" ' +
        "class=\"container-fluid\" style='height: 100%; width: 100%; object-fit: contain'/>";
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(headline.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(
          product_info.cloneNode()
        );
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(
          document.createElement("br")
        );
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(price.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(button1.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(button2.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "h4"
        )[0].textContent = jsonResponse.data[i].name;
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "p"
        )[0].textContent = jsonResponse.data[i].description;
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "h3"
        )[0].innerHTML =
        "<strong>" + "Rs. " + jsonResponse.data[i].price + ".0" + "</strong>";
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "button"
        )[0].innerHTML = "Order";
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "button"
        )[1].innerHTML = "Remove";
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName("button")[0]
        .addEventListener("click", orderTheProduct);
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName("button")[1]
        .addEventListener("click", function(){
            removeProductFromCart(jsonResponse.data[i].id)
        },false);
    }
  } else {
    console.log("THERE IS SOME ERROR OCCURED");
  }
};

const showAllUserProducts = async () => {
  let response = await fetch(
    "http://localhost:9090/userProducts/" + params.user_id,
    {
      method: "GET",
    }
  );
  if (response.status == 200) {
    let userCartProducts = await response.json();

    for (let i in userCartProducts.data) {
      document
        .getElementById("products-container")
        .appendChild(parent_div.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.appendChild(image_div.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.appendChild(info_div.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.firstElementChild.appendChild(
          inner_image_div.cloneNode()
        );
      document.getElementById(
        "products-container"
      ).lastElementChild.firstElementChild.firstElementChild.innerHTML =
        '<img src="images/' +
        userCartProducts.data[i].image_id +
        '" ' +
        "class=\"container-fluid\" style='height: 100%; width: 100%; object-fit: contain'/>";
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(headline.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(
          product_info.cloneNode()
        );
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(
          document.createElement("br")
        );
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(price.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(button1.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.appendChild(button2.cloneNode());
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "h4"
        )[0].textContent = userCartProducts.data[i].name;
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "p"
        )[0].textContent = userCartProducts.data[i].description;
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "h3"
        )[0].innerHTML =
        "<strong>" +
        "Rs. " +
        userCartProducts.data[i].price +
        ".0" +
        "</strong>";
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "button"
        )[0].innerHTML = "Order";
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName(
          "button"
        )[1].innerHTML = "Remove";
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName("button")[0]
        .addEventListener("click", orderTheProduct);
      document
        .getElementById("products-container")
        .lastElementChild.lastElementChild.getElementsByTagName("button")[1]
        .addEventListener("click", function(){
            removeProductFromCart(userCartProducts.data[i].id);
        },false);
    }
  } else {
    console.log("CODE HERE TO HANDLE THE ERROR");
  }
};

if (params.product_id == undefined) {
  showAllUserProducts();
} else {
  getUserCartProducts();
}
