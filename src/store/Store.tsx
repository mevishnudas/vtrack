import Cookies from "js-cookie";

type userData = {
    name:string,
    token:string
}

const saveUserData  = async (data:userData) =>{

    Cookies.set("user_data", JSON.stringify(data), {
        expires: 7,      // days
        path: "/",       // accessible everywhere
    });

    // console.log("Cookie Saved");
    return true;
};

const getUserData = async () =>{
    const userData = Cookies.get("user_data");
    return userData?userData:JSON.parse(userData);
}

const deleteUserData = () =>{
    Cookies.remove("user_data");
    return true;
}

export {saveUserData,getUserData,deleteUserData};