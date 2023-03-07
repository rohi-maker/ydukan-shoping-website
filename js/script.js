// code to remove all the offset-1 class from the first element of the div
let productRowDiv=document.getElementById("productRows")
let x=productRowDiv.getElementsByClassName("product-row");
for(let i=0;i<x.length;i++){ 
    x[i].firstElementChild.classList.remove("offset-1");
}