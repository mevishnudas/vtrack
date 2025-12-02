import { useForm } from "react-hook-form";
import {error_message} from "../../../utils/ErrorMessages";
import { useState,useEffect } from "react";

const Form = () =>{
    const [logging,setLogging] = useState(false);
    const [loginError,setLoginError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data:any) => {
        //console.log("Form Data:", data);
        setLogging(true);
        tryLogin(data);
    };

    const tryLogin = async (data:any) =>{
        // console.log("Try again");
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username:data.username,
                    password:data.password
                }),
            });

            // const data = await res.json();
            // console.log(data);
            console.log("Response",response);
            setLoginError(false);

         } catch (err) {
            console.error(err);
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