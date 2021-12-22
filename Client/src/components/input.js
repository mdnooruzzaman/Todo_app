import React from "react";


function Input(props){
    return(
        <div>
            <input type="text" placeholder="  Add item to the list"
            value={ props.value} 
            onChange={props.onChange}
            />
        </div>
    )
}
export default Input;