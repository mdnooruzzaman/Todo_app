import React, {  useState } from "react";


import './register.scss'

function Register(props){

    const [user , setUser] = useState([
        {username: "" , email : " " , password: " " , cpassword : " "}
    ])

    const handleChange = (e) => {
            setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
            
    }
    
    
    
    const registerUser = () => {
        
        fetch('/register' , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify({
               username:user.username , 
               email:user.email , 
               password:user.password
            })
        })
        .then(response => response.json())
        .then( res => {if(res){
            props.onRegister();

        }else{
            console.log("Not register")
        }
    })
       
    }

 

    return(
        <div className="register">
            <div className="reg">
                <h2>Register</h2>
                <div className="input_field">
                <input 
                    type= "text" 
                    placeholder="  Username" 
                    value={user.username} 
                    name="username" 
                    onChange={handleChange}   
                    required 
                />
                <input 
                    type= "email" 
                    placeholder="  Email" 
                    value={user.email} 
                    name = "email"
                    onChange={handleChange} 
                    required
                />
                <input 
                    type= "password" 
                    placeholder="  Password" 
                    value={user.password} 
                    name = "password"
                    onChange={handleChange} 
                    required
                />
                <input
                     type= "password" 
                     placeholder="  Confirm password" 
                     value={user.cpassword} 
                     name = "cpassword"
                     onChange={handleChange} 
                     required
                />
                </div>
                <button onClick = {registerUser} className="btn2">Register</button>
                <p>Already you have account <a href="signin">SignIn</a></p>
            </div>
        </div>
    )
}
export default Register;