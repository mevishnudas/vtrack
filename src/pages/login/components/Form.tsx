import { useForm } from "react-hook-form";
import {error_message} from "../../../utils/ErrorMessages";
import { useState,useEffect } from "react";
import {saveUserData,getUserData} from "../../../store/Store";
import {openRequest} from "../../../services/Fetch";
import { useNavigate } from "react-router-dom";

const Form = () =>{
    const navigate = useNavigate();
    const [logging,setLogging] = useState(false);
    const [loginError,setLoginError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data:any) => {
        setLogging(true);
        tryLogin(data);
    };

    const tryLogin = async (data:any) =>{

        let params = {
            path:"login",
            method:"POST",
            body:{
                    username:data.username,
                    password:data.password
            },
        }
        let response = await openRequest(params);

        if(response.request){
            let resData = response.data.data;
            
            let userData = {
                name:resData.name,
                token:resData.token
            }
            
            await saveUserData(userData);

            let res = await getUserData();
            // console.log(res);
            setLoginError(false);
            
            //Redirect Dash
            navigate("/",{ replace: true });
            
        }else{
            // console.log("Failed",response.data);
            setLoginError(true);
            setLogging(false);
        }

    }

    useEffect(()=>{

        console.log("Login screen",import.meta.env.VITE_BASE_URL);

        //return
        return()=>{
        };

    },[]);
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        type="text"
                        // required
                        className="bg-white px-2 py-1 rounded-sm"
                        placeholder="Email"
                        autoComplete="off"

                        {...register("username", {
                            required: error_message.required,
                            minLength: { value: 3, message: error_message.min_length},
                        })}

                    />

                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                    
                </div>

                <div className="mt-2">
                    <input 
                        type="password"
                        // required
                        className="bg-white px-2 py-1 rounded-sm"
                        placeholder="Password"
                        autoComplete="off"

                        {...register("password", {
                            required: error_message.required,
                            minLength: { value: 3, message: error_message.min_length },
                        })}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <div className="mt-2">
                    <button type="submit" 
                        className="bg-cyan-500 p-2 rounded-sm text-white"
                        disabled={logging}
                    >{loginError?"Try again":"Login"}
                    </button>

                </div>
            </form>
    );
};

export default Form;