// let product_row=document.createElement("div");
// let product_row_class_list=["d-flex","flex-row","border","border-dark","pb-3"]
// for(item in product_row_class_list){
//     product_row.classList.add(item);
// }
const getAllProducts= async ()=>{
      let allProducts = await fetch("http://localhost:9090/allproducts",{method : "GET"});  
      let productsResponse= await allProducts.json();
      return productsResponse;
}
getAllProducts().then((value)=>{
    return value;
},(error)=>{
    console.log(error)
}).then((allData)=>{ // in this block we need to write all the code of showing products to user
    let no_of_product_rows=Math.ceil(allData.length/4); // getting how many total no. of product rows we have to create
    let product_row=document.createElement("div");
    let product_row_class_list=["d-flex","flex-row","justify-content-center","mt-3","product-row"]
    for(item in product_row_class_list){ 
    product_row.classList.add(product_row_class_list[item]);
    }
    let productRowDiv=document.getElementById("productRows")
    console.log(no_of_product_rows);
    for(let i=0;i<no_of_product_rows;i++){ // adding product row on the front page
        productRowDiv.appendChild(product_row.cloneNode());
    }
    let product_block=document.createElement("div");
    product_block_class_list=["col-sm-2", "flex-column", "mb-3", "offset-1","product-block"]
    for(item in product_block_class_list){
        product_block.classList.add(product_block_class_list[item]);
    }
    let myProductRows=productRowDiv.getElementsByClassName("product-row"); // all product row list
    let counter=0;
    
    for(let i=0;i<no_of_product_rows;i++){ // this loop will run 4 times
        for(let j=counter;j<counter+4 && j<allData.length;j++){
            myProductRows[i].appendChild(product_block.cloneNode());
        }
        counter+=4;
    }
    let image_div=document.createElement("div");
    image_div.classList.add("mt-4");
    image_div.classList.add("image-div");
    image_div.style="width: 209px; height: 123px;"
    let info_div=document.createElement("div");
    info_div.classList.add("info-div");
    info_div.classList.add("mt-2");
    info_div.classList.add("pb-3");
    info_div.style="background-color: #EDF1D6;"
    let all_product_blocks=document.getElementsByClassName("product-block");
    console.log(all_product_blocks.length);
    for(let i=0;i<all_product_blocks.length;i++){
        all_product_blocks[i].appendChild(image_div.cloneNode());
        all_product_blocks[i].appendChild(info_div.cloneNode());
    }

    // Applying data on the frontend of all product blocks

    // product image
    let product_image=document.createElement("img");
    product_image.classList.add("container-fluid");
    product_image.style="height: 100%; width: 100%; object-fit: contain;"

    let product_heading=document.createElement("h6");
    product_heading.classList.add("mb-0")
    product_heading.classList.add("ps-2")
    product_heading.classList.add("pt-2")
    let strong=document.createElement("strong");
    let product_link=document.createElement("a");
    product_link.style="text-decoration: none; color: black;"
    
    
    
    let product_small=document.createElement("small");
    product_small.classList.add("text-muted");
    product_small.classList.add("mb-0");
    product_small.classList.add("ps-2");

    let add_cart_button=document.createElement("a");
    add_cart_button.classList.add("btn");
    add_cart_button.classList.add("btn-outline-dark");
    add_cart_button.classList.add("btn-sm");
    add_cart_button.classList.add("ms-2");
    add_cart_button.classList.add("to-cart-button");
    add_cart_button.style="font-size: 0.8em;"
    let product_price=document.createElement("strong");
    product_price.classList.add("ms-5");
    for(let i=0;i<all_product_blocks.length;i++){
        product_image.src="images/"+allData[i].image_id;
        all_product_blocks[i].firstElementChild.appendChild(product_image.cloneNode());
        all_product_blocks[i].lastElementChild.appendChild(product_heading.cloneNode());
        all_product_blocks[i].lastElementChild.firstElementChild.appendChild(strong.cloneNode());
        all_product_blocks[i].lastElementChild.firstElementChild.firstElementChild.appendChild(product_link.cloneNode());
        all_product_blocks[i].lastElementChild.firstElementChild.firstElementChild.firstElementChild.textContent=allData[i].name;
        all_product_blocks[i].lastElementChild.firstElementChild.firstElementChild.firstElementChild.href="/product_view.html?id="+allData[i].id;
        all_product_blocks[i].lastElementChild.appendChild(product_small.cloneNode());
        all_product_blocks[i].lastElementChild.getElementsByTagName("small")[0].textContent=allData[i].tagline;
        all_product_blocks[i].lastElementChild.appendChild(add_cart_button.cloneNode());
        all_product_blocks[i].lastElementChild.getElementsByClassName("to-cart-button")[0].textContent="Add to cart"
        all_product_blocks[i].lastElementChild.getElementsByClassName("to-cart-button")[0].href="/cart.html"
        all_product_blocks[i].lastElementChild.appendChild(product_price.cloneNode());
    }
    for(let item in myProductRows){
        myProductRows[item].firstElementChild.classList.remove("offset-1");
    }

})



