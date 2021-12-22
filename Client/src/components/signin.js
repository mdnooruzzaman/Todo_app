import React, {   useState } from "react";



//import {MdOutlineEmail } from "react-icons/md";
import './signin.scss'

function SignIn(props){
    
    const [registerUser , setRegisterUser] = useState(
        {email:"" , password:""}
    )
    // const [user , setUser] = useState([])

    const handleChange = (e) =>{
        setRegisterUser(preveState => ({...preveState , [e.target.name]:[e.target.value]}));
    }

    const signIn  = () =>{
        console.log(registerUser.email)
        console.log(registerUser.password)
        fetch(`/api/signin/${registerUser.email}`)
        .then(res => res.json())
        .then(user => {if(user){

            props.onSignIn()
        }else{
            console.log("U r not yet regsiter")
        }
    })

        


    }

   

    console.log(registerUser)

    return(
        <div className="signin">
            <div className="sign">
                <h2>SignIn</h2>
                <div className="input_field1">
                <input 
                    type= "email" 
                    value={registerUser.email}
                    name = "email"
                    onChange={handleChange}
                    placeholder="  Email" 
                    required
                />
                <input 
                    type= "password" 
                    value = {registerUser.password}
                    name = "password"
                    onChange={handleChange}
                    placeholder="  Password" 
                    required
                />
                </div>
                <button onClick={signIn} className="btn1">SignIn</button>
                <p>You don't have account register <a href="/">Register</a></p>
            </div>
        </div>
    )
}
export default SignIn;