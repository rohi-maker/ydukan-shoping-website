const urlParams = new URLSearchParams(location.search)
let user_id;
for (const [key, value] of urlParams) {
    user_id=value;
}
const updateUserDetails=()=>{
    window.location="http://localhost:5500/update.html?id="+user_id
}
const showUserDetails=async()=>{
    let userResponse=await fetch("http://localhost:9090/user/"+user_id,{
        method: "GET"
    })

    if(userResponse.status==200){
        let jsonResponse=await userResponse.json()
        document.getElementById("name-view").textContent=jsonResponse.data.name
        document.getElementById("email-view").textContent="Email ID: "+jsonResponse.data.email
        if(jsonResponse.data.livingAddresses==null){
        document.getElementById("address-view").textContent="NO ADDRESS SPECIFIED"
        }
        else{
            document.getElementById("address-view").textContent=jsonResponse.data.livingAddresses[0]
        }
        document.getElementById("mobile-view").textContent="+91-"+jsonResponse.data.firstMobile
        document.getElementById("second-mobile-view").textContent=jsonResponse.data.secondMobile
        document.getElementById("pin-view").textContent=jsonResponse.data.pin
        document.getElementById("city-view").textContent=jsonResponse.data.district
    }
    else{
        console.log("THE RESPONSE CODE IS NOT OK")
    }
}
showUserDetails()