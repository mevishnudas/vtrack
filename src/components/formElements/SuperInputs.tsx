import { SimpleInput } from "./SimpleInputs";
import { IoCloseSharp } from "react-icons/io5";
import { useRef } from "react";

type SearchWithCloseProps = {
    placeholder:String,
    closeBtn:Boolean,
    clearSearch:Function
}
const SearchWithClose = ({placeholder,closeBtn,clearSearch,...rest}:SearchWithCloseProps) =>{
    const searchInputRef = useRef<HTMLInputElement>(null);

    return(
        <>
        <div>
            <SimpleInput 
                customClassName="border-1 rounded-sm bg-slate-900 border-gray-600 text-sm w-full"
                placeholder={placeholder} 
                {...rest}

                ref={searchInputRef}
            />

            {closeBtn&&(
                <div onClick={()=>{searchInputRef.current.value = "";clearSearch();}} className="relative bg-green-300 items-end justify-end flex">
                    <div  className="cursor-pointer absolute h-7.5 px-2 text-white bg-red-400 flex justify-center items-center rounded-r-sm">
                        <IoCloseSharp size={18}/>
                    </div>
                </div> 
            )} 
        </div>
        </>
    );
}

export {SearchWithClose};