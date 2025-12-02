import React from "react";
import { Link } from "react-router-dom";
import Form from "./components/Form";


const Login = () =>{
    
    return(
        <>  
        <div className="bg-sky-950 h-screen">
            <h1>Login Screen</h1>
            <Form/>
            <Link to="/">Dash</Link>
        </div>
        </>
    );
};

export default Login;