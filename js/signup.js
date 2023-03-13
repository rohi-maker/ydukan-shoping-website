let invalid_input_alert=document.createElement("div");
invalid_input_alert.classList.add("alert","alert-danger","mt-3","mx-2")
invalid_input_alert.id="invalid-input-alert"
let form_container=document.getElementById("form-container")
class SignUpRequest{
    constructor(name,email,mobile,password){
        this.name=name;
        this.email=email;
        this.firstMobile=mobile;
        this.password=password;
    }
    
}
const doAlert=(message)=>{
    invalid_input_alert.innerHTML=message
        if(form_container.contains(document.getElementById("invalid-input-alert"))){
            form_container.removeChild(document.getElementById("invalid-input-alert"))
        }
        form_container.prepend(invalid_input_alert)
}
const doSignUp=async ()=>{
    
    if(document.getElementById("username").value=="" || document.getElementById("email").value=="" || document.getElementById("mobile").value=="" || document.getElementById("password").value=="" || document.getElementById("reconfirm-password").value==""){
        doAlert("<strong>BLANK INPUT FIELD</strong> YOU HAVE LEFT SOME INPUT FIELD BLANK")
    }
    else if(document.getElementById("mobile").value.match(/^[0-9]+$/)==false || document.getElementById("mobile").value.length!=10){
        doAlert("<strong>INVALID MOBILE NUMBER</strong> PLEASE ENTER THE CORRECT MOBILE NUMBER")
    }
    else if(document.getElementById("password").value===document.getElementById("reconfirm-password").value){
    let request=new SignUpRequest(document.getElementById("username").value,document.getElementById("email").value,document.getElementById("mobile").value,document.getElementById("password").value)
    let response= await fetch("http://localhost:9090/ydukaan/signup",{
        method : "POST",
        body: JSON.stringify(request),
        headers : {
            "Content-Type" : "application/json"
        }
    })
    if(response.status!=201){
        doAlert("<strong>USER ALREADY REGISTERED</strong> THIS EMAIL ID HAS ALREADY REGISTERED WITH YDUKAAN")
    }
    else{
    let jsonResponse=await response.json()
    window.location="http://localhost:5500/index.html?id="+jsonResponse.data
    }
    }
    else{
        doAlert("<strong>DIFFERENT RECONFIRM PASSWORD</strong> BOTH PASSWORDS NOT MATCHES")
    }
}
