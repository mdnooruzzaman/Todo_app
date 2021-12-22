import React from "react"
import "./todo.scss";
import { MdDelete } from "react-icons/md";
import { MdEditCalendar } from "react-icons/md";


function Child(props){
 
    return(
        <div className="child">
            <div className="child1">
                <p>
                    {props.value}
                </p>
            </div> 
            <div >
                <button onClick={ () => props.onEdit(props.id)} type="submit" className="b1"><MdEditCalendar/> EDIT</button>
                <button onClick={ () => props.onDelete(props.id)} type="submit" className="b2"><MdDelete/> DELETE</button>
            </div>
            
        </div>
    )
    
}
export default Child