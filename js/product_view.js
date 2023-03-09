// getting the id of the product in order to get it from backend
const urlParams = new URLSearchParams(location.search);
let product_id;
for (const [key, value] of urlParams) {
    product_id=value;
}
const getProductById=async()=>{
    let responseObject=await fetch("http://localhost:9090/product/"+product_id,{method : "GET"});
    let responseJson=await responseObject.json();
    return responseJson;
}

getProductById().then((productResponse)=>{ // now modify the view to represent the product charactersticks
    let carousel_items=document.getElementsByClassName("p-image");
    for(let i in carousel_items){
        carousel_items[i].src="images/"+productResponse.image_id;
    }
    let info_div=document.getElementById("info-div");
    info_div.firstElementChild.firstElementChild.textContent=productResponse.name;
    let product_description=document.getElementById("product-description");
    product_description.classList.add("ms-2")
    product_description.textContent=productResponse.description;
    let feature_list=document.getElementById("features-list")
    for(let i in productResponse.characteristics){
        feature_list.innerHTML=feature_list.innerHTML+"<li>"+productResponse.characteristics[i]+"</li>"
    }

},(error)=>{
    console.log("THERE IS SOME ERROR");
})
