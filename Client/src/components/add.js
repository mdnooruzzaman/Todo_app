import React from "react";

import { MdAddTask } from "react-icons/md";

function Add(props){
    return(
        <div>
           <button className='button1' onClick={props.value ? props.onAdd : props.onUpdate}> <MdAddTask/>{props.value ? "ADD" : "Update"}</button>
        </div>
    )
}
export default Add;