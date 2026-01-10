import { ReactNode } from "react";

type SimpleModelProps ={
    isOpen:boolean,
    setModelStatus:any,
    children:ReactNode
};

const SimpleModel = ({isOpen,setModelStatus,children}:SimpleModelProps) =>{

    return(<>
        {isOpen&&(
            <div 
                onClick={()=>setModelStatus(false)}
                className="fixed inset-0 bg-black/50 flex justify-center items-center trans">
                
                <div onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>

            </div>
        )}
    </>);
};

export default SimpleModel;