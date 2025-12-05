import { useNavigate } from "react-router-dom";
import {getUserData,deleteUserData} from "../store/Store";


type parameters = {
    path:string,
    method:string,
    body:object,
    content_type?:string
};

const openRequest = async (params:parameters) =>{

    let response = {
        request:false,
        data:null
    }
    
    try {
        
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}`+params.path, {
            method: params.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params.body),
        });

        if (res.status==200) {
            response.request = true;
            response.data = await res.json();
        }else{
            response.request = false;
            response.data = await res.json();
        }

        return response;   

    } catch (err) {

        response.request = false;
        response.data = err;

        return response;
    }

};

type parameters02 = {
    path:string,
    method:string,
    auth:boolean,
    body?:object,
    content_type?:string
};

const fetchRequest = async (params:parameters02) =>{

    let response = {
        request:false,
        data:null
    }

    try {
        
        let headers = {
            "Content-Type": "application/json",
        }

        //Add Token
        if(params.auth){

            let userData = await getUserData();
            if(!userData){
                console.log(userData,"Re Login");
                await reLogin();
            }

            headers["Authorization"] = "Bearer "+userData.token;
            console.log(userData.token);
        }

        let pass_params = {
            method: params.method,
            headers: headers,
            //body: JSON.stringify(params.body),
        }

        if(params.body){
            pass_params.body = JSON.stringify(params.body);
        }
        
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}`+params.path,pass_params);

        switch (res.status) {
            case 200:
                response.request = true;
                response.data = await res.json();
                break;
        
            case 403:
                console.log("re login required");
                //await reLogin();
                break;
            default:
                response.request = false;
                response.data = await res.json();
                break;
        }

        return response;

    } catch (error) {
        response.request = false;
        response.data = error;

        return response;
    }



}

const reLogin = async () =>{
    const navigate = useNavigate();
    
    await deleteUserData();
    //Redirect Dash
    return navigate("/login",{ replace: true });
}

export {openRequest,fetchRequest};