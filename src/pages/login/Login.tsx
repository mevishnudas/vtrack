import React from "react";
import { Link } from "react-router-dom";
import Form from "./components/Form";
import PageTitle from "../../utils/PageTitle";
// import loginImage from "../../assets/images/login-bg.webp";

const Login = () =>{
    
    return(
        <> 
        <PageTitle pageName="Login"/> 
        <div className={` h-screen bg-[image:url('/assets/images/login-bg.webp')] bg-cover bg-center`}>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 h-full">
                <div className="col-span-2 hidden sm:block"></div>
                <div className="col-span-1">

                    <div className="bg-linear-to-b #0000 to-red-800 backdrop-blur-md rounded-sm h-full flex items-center justify-center">
                        <div className="w-full p-5">
                            <h1 className="font-bold pb-2 text-white text-center text-4xl uppercase">Vtrack</h1>
                            <h1 className="font-bold text-white">Sign In</h1>
                            <Form/>
                            <p className="text-white py-1">Forgot password ?</p>
                        </div>
                        {/* <Link to="/">Dash</Link> */}
                    </div>

                </div>
            </div>

        </div>
        </>
    );
};

export default Login;