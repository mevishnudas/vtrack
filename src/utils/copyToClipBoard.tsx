import {toastSuccessBottomRight} from "./Toast";

type copyToClipBoardProps ={
    message:string
}

const copyToClipBoard = async ({message}:copyToClipBoardProps) =>{
    
    await navigator.clipboard.writeText(message);

    toastSuccessBottomRight({
        message:"Copied to clipboard"
    });
};

export {copyToClipBoard}