import React from "react";
import './signout.scss'

function Signout(props){
    return(
        <div>
            <button onClick={props.onLogout} className="bt3">Log out</button>
        </div>
    )
}
export default Signout;