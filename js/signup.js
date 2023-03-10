class SignUpRequest{
    constructor(name,email,mobile,password,rePassword){
        this.name=name;
        this.email=email;
        this.mobile=mobile;
        this.password=password;
        this.rePassword=rePassword;
    }
    
}
const doSignUp=()=>{
    let request=new SignUpRequest(document.getElementById("username").value,document.getElementById("email").value,document.getElementById("mobile").value,document.getElementById("password").value,document.getElementById("reconfirm-password").value)
    fetch("http://localhost:9090/ydukaan/signup",{
        method : "POST",
        body : JSON.stringify(request),
        headers : {
            "Content-Type": "application/json"
        }
    }).then((value)=>{
        return value.json()
    },(error)=>{
        console.log(error)
    }).then((jsonResponse)=>{
        console.log(jsonResponse)
    },(error)=>{
        console.log(error)
    })
}
