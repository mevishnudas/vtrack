import { useState } from "react";
import PageTitle from "../../utils/PageTitle";
import Overview from "./components/Overview";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDataset } from "react-icons/md";
import List from "./components/List";

const Expenses = () =>{
    const[manageState,setManageState] = useState("ADD");
    
    const switchManage = (manage:string) =>{
        setManageState(manage);
    }

    return(
        <>
            <PageTitle pageName="Expenses"/>
            <div className="p-2">
                <h1 className="font-bold text-white">Expenses</h1>

                <div className="grid grid-cols-3 pt-2">
                    <div className="col-span-2">
                        <Overview/>
                        <List/>
                    </div>

                    <div className="col-span-1 px-2">

                        <div className="border-b-0 border-b-gray-800">
                            <ul className="flex gap-1">
                                <li className={`${manageState=="ADD"?"bg-blue-800":"bg-blue-950"}  w-full rounded-t-xl rounded-t-r-xl text-white flex justify-center items-center gap-1 cursor-pointer`} onClick={()=>switchManage("ADD")}><IoIosAddCircleOutline/> Add</li>
                                <li className={`${manageState=="CAT"?"bg-blue-800":"bg-blue-950"} w-full rounded-t-xl rounded-t-r-xl text-white flex justify-center items-center gap-1 cursor-pointer`} onClick={()=>switchManage("CAT")}><MdOutlineDataset/> Category</li>
                            </ul>
                        </div>
                        <div className=" rounded-b-sm min-h-100 border-1 border-gray-800">
                            {manageState=="ADD"&&(<><div className="text-white text-center p-5">New</div></>)}
                            {manageState=="CAT"&&(<><div className="text-white text-center p-5">Category</div></>)}
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
};

export default Expenses;