import React from "react";
import { Redirect } from "react-router";
const Logout = ()=>{
    localStorage.removeItem("user")
    
    return(
        <Redirect  to="login"/>
    )
}
export default Logout