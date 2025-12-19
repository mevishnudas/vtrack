import { useForm } from "react-hook-form";
import {error_message} from "../../../utils/ErrorMessages";
import { useState,useEffect } from "react";
import {saveUserData,getUserData} from "../../../store/Store";
import {openRequest} from "../../../services/Fetch";
import { useNavigate } from "react-router-dom";
import { ImSpinner } from "react-icons/im";

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
                <div className="py-2">
                    <input 
                        type="text"
                        // required
                        className="bg-slate-950 text-white text-base px-3 py-2 rounded-sm outline-none w-full"
                        placeholder="Email"
                        autoComplete="off"

                        autoFocus={true}
                        value={"dvishnudas@gmail.com"}

                        {...register("username", {
                            required: error_message.required,
                            minLength: { value: 3, message: error_message.min_length},
                        })}

                    />

                    {errors.username && (
                        <p className="text-red-300 text-sm">{errors.username.message}</p>
                    )}
                    
                </div>

                <div className="pt-2">
                    <input 
                        type="password"
                        // required
                        className="bg-slate-950 text-white px-3 py-2 rounded-sm outline-none w-full"
                        placeholder="Password"
                        autoComplete="off"

                        value={"password"}

                        {...register("password", {
                            required: error_message.required,
                            minLength: { value: 3, message: error_message.min_length },
                        })}
                    />

                    {errors.password && (
                        <p className="text-red-300 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <div className="mt-2">
                    {loginError&&<><p className="text-red-200 pb-1">Failed please try again.</p></>}
                    <button type="submit" 
                        className={` ${logging?"bg-cyan-800":"bg-cyan-500"} rounded-sm text-white w-40 h-8 flex justify-center items-center gap-1.5`}
                        disabled={logging}
                    >
                        {logging?(<><ImSpinner className="animate-spin" size={20}/> <span>Authorizing...</span></>):<span>Login</span>}
                    </button>
                </div>
            </form>
    );
};

export default Form;