import { useEffect,useState,useRef } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import {reLogin} from "../../services/Fetch";

//Components
import SideBar from "./SideBar";
const Head = () =>{
    
    const [sideBarShow,setSideBarShow] = useState(false);
    const [settingsMenu,setSettingsMenu] = useState(false);
    // const menuRef = useRef(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const outSideClick = (event:MouseEvent) =>{
        //console.log(event.target);
        if ( menuRef.current &&
            event.target instanceof Node &&
            !menuRef.current.contains(event.target)) {
            setSettingsMenu(false);
        }

    }

    useEffect(() => {
        
        //Out Side Click Event
        document.addEventListener('click', outSideClick);
        return () => {
            document.removeEventListener('click', outSideClick);
        };
    });
    return(
        <>  
            <div className="bg-linear-to-r from-gray-900 to-gray-950 border-b-1 border-b-gray-800 py-2 px-4 fixed w-full">
                <div className="grid grid-flow-row-dense grid-cols-3">
                    <div className="col-span-2">
                        <MdOutlineMenu className='text-amber-50 cursor-pointer' onClick={()=>setSideBarShow(!sideBarShow)} size={25} />
                    </div>
                    
                    <div className="justify-items-end" ref={menuRef}>
                        <CiSettings className='text-amber-50 cursor-pointer hover:text-amber-200' onClick={()=>setSettingsMenu(!settingsMenu)} size={25}/>

                        <ul className={`bg-orange-200 absolute mt-2 rounded-b-sm ${settingsMenu?"block":"hidden"}`}>
                            <li className="py-1 px-4 cursor-pointer select-none border-b-1 border-b-orange-300 hover:bg-orange-300 flex justify-start items-center"><LuSettings2 size={20}/>&nbsp;&nbsp;Settings</li>
                            <li className="py-1 px-4 cursor-pointer select-none border-b-1 border-b-orange-300 hover:bg-orange-300 flex justify-left items-center"><MdAccountCircle size={20}/>&nbsp;&nbsp;Account</li>
                            <li className="py-1 px-4 cursor-pointer select-none flex items-center justify-left hover:bg-orange-300" onClick={reLogin}><IoIosLogOut size={20}/>&nbsp;&nbsp;Logout</li>
                        </ul>
                    </div>

                </div>
            </div>

            <SideBar setSideBarShow={setSideBarShow} sideBarShow={sideBarShow}/>
            
        </>
    )
};

export default Head;