import { toast,Bounce } from 'react-toastify';

type toastProps = {
    message:string,
    theme?:string
}

const toastSuccessBottomRight = ({message,theme}:toastProps) =>{

    toast.success(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: theme==""?"light":theme,
        transition: Bounce,
    });
}

const toastErrorBottomRight = ({message,theme}:toastProps) =>{

    toast.error(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: theme==""?"light":theme,
        transition: Bounce,
    });
}

export {toastSuccessBottomRight,toastErrorBottomRight};