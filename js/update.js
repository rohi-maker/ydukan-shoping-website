const urlParams = new URLSearchParams(location.search)
let user_id;
let details_div=document.getElementById("details-div")
let alert_div=document.createElement("div")
alert_div.classList.add("alert","alert-danger","border","border-info","ms-2")
alert_div.id="alert-div"
for (const [key, value] of urlParams) {
    user_id=value;
}
const doAlert = (message)=>{
    if(details_div.contains(document.getElementById("alert-div"))){
        details_div.removeChild(document.getElementById("alert-div"))
    }
    alert_div.textContent=message
    details_div.prepend(alert_div)
}
let responseFromApi;
class UserRequest{
    constructor(id,name,email,firstMobile,password,secondMobile,pin,district,livingAddresses){
        this.id=id;
        this.name=name;
        this.email=email;
        this.livingAddresses=livingAddresses
        this.firstMobile=firstMobile
        this.secondMobile=secondMobile
        this.pin=pin
        this.district=district
        this.password=password
    }
}
const updateUser=async ()=>{
      let addressList=[]
      addressList.push(document.getElementById("address-bar").value)
      let updateRequest=new UserRequest(responseFromApi.data.id,responseFromApi.data.name,responseFromApi.data.email,responseFromApi.data.firstMobile,responseFromApi.data.password,document.getElementById("second-mobile").value,document.getElementById("pin-code").value,document.getElementById("city-bar").value,addressList)
      let responseAfterUpdate=await fetch("http://localhost:9090/update/user",
        {
          method : "PUT",
          headers : {
              "Content-Type":"application/json"
          },
          body: JSON.stringify(updateRequest)
      })
      if(responseAfterUpdate.status==200){
            window.location="http://localhost:5500/account.html?id="+responseFromApi.data.id
      }
      else{
          doAlert("<strong>DETAILS NOT UPDATED</strong> THERE IS SOME PROBLEM TRY AGAIN LATTER")
      }
    }
const getUserDetails=async()=>{
    let userResponse=await fetch("http://localhost:9090/user/"+user_id,{
        method: "GET"
    })

    if(userResponse.status==200){
        let jsonResponse=await userResponse.json()
        document.getElementById("name-view").textContent=jsonResponse.data.name
        document.getElementById("email-view").textContent="Email ID: "+jsonResponse.data.email
        document.getElementById("mobile-view").textContent="+91-"+jsonResponse.data.firstMobile
        if(jsonResponse.data.livingAddresses!=null){
            document.getElementById("address-bar").value=jsonResponse.data.livingAddresses[0]
        }
        if(jsonResponse.data.secondMobile!=null){
            document.getElementById("second-mobile").value=jsonResponse.data.secondMobile
        }
        if(jsonResponse.data.pin!=null){
            document.getElementById("pin-code").value=jsonResponse.data.pin
        }
        if(jsonResponse.data.district!=null){
            document.getElementById("city-bar").value=jsonResponse.data.district
        }
        responseFromApi=jsonResponse
    }
    else{
        console.log("THE RESPONSE CODE IS NOT OK")
        console.log(userResponse)
    }
}
let response=getUserDetails()
