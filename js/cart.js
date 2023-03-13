const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const updateUserCart=async (cart) =>{
    let updateResponse = await fetch("http://localhost:9090/user/cartlist/"+params.user_id,{
        method: "PUT",
        body: JSON.stringify(cart),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(updateResponse.status==200){
        let jsonResponse=updateResponse.json()
        console.log(jsonResponse)
        // other logic of placing the products of cart in cart.html page
    }
    else{
        console.log("DO ERROR HANDELING HERE")
    }
}
const getUserCartProducts=async ()=>{
    let cartProducts=await fetch("http://localhost:9090/user/cart/"+params.user_id,{
        method: "GET"
    })
    if(cartProducts.status==200){
        let response = await cartProducts.json()
        response.data.push(params.product_id)
        updateUserCart(response.data)
    }
    else{
        console.log("STATUS IS NOT OK")
    }
}
getUserCartProducts()