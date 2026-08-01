import Cookies from "js-cookie";

type userData = {
    name:string,
    token:string
}

const saveUserData  = async (data:userData) =>{

    Cookies.set("user_data", encodeURIComponent(JSON.stringify(data)), {
        expires: 25,      // days
        path: "/",       // accessible everywhere
    });
    //sessionStorage.setItem("user_data", JSON.stringify(data));
    // console.log("Cookie Saved");
    return true;
};

const getUserData = async () =>{
    const userData = Cookies.get("user_data");
    // const userData = sessionStorage.getItem("user_data");
    //return userData?JSON.parse(userData):false;
    return userData?JSON.parse(decodeURIComponent(userData)):false;
}

const deleteUserData = () =>{
    Cookies.remove("user_data");
    // sessionStorage.removeItem("user_data");
    return true;
}

export {saveUserData,getUserData,deleteUserData};