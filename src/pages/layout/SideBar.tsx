import { useNavigate  } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useState } from "react";
import { MdKeyboardArrowRight,MdKeyboardArrowDown  } from "react-icons/md";
import { TbMailDollar } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

type props ={
    setSideBarShow:any,
    sideBarShow:boolean
};
const SideBar = ({setSideBarShow,sideBarShow}:props) =>{  
    const navigate = useNavigate();
    const [openedMenu,setOpenMenu] = useState("");
    const [activeMenu,setActiveMenu] = useState("");

    const closeSideBar = () =>{
        setSideBarShow(false);
    }

    const navScreen = (page:string,name:string) =>{
        closeSideBar();
        
        setActiveMenu(name);
        navigate(page);
    }

    const toggleMenu = (menu:string) =>{
        openedMenu?setOpenMenu(""):setOpenMenu(menu);
    }

    return(
        <>  
            <div className={`bg-gray-900/10 backdrop-blur-[1px] backdrop-brightness-90 fixed top-0 h-screen w-screen z-10                   
                            
                                duration-500 
                                ${sideBarShow?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}

                            `} onClick={closeSideBar}>

                                
                <div className={`bg-gray-900 absolute w-55 h-screen
                                    duration-350 
                                    ${sideBarShow?"-translate-x-0":"-translate-x-50"}

                                `} onClick={(e) => e.stopPropagation()}>
                    <div><h2 className="text-center text-amber-50 py-2 font-bold bg-linear-to-r from-cyan-500 to-blue-500">VTrack</h2></div>

                    
                    <div>
                        <div onClick={()=>navScreen('/','dash')} className={`${activeMenu==="dash"?"bg-gray-600":"bg-gray-800"} px-2 py-2 cursor-pointer text-amber-50 border-b-1 border-b-gray-700 flex justify-left items-center gap-2 hover:bg-gray-700 select-none`}><MdDashboard size={20}/> Dashboard</div>
                        <div onClick={()=>navScreen('splitwise','splitwise')} className={`${activeMenu==="splitcheyu"?"bg-gray-600":"bg-gray-800"} px-2 py-2 cursor-pointer text-amber-50 border-b-1 border-b-gray-700 flex justify-left items-center gap-2 hover:bg-gray-700 select-none`}><TbMailDollar size={20}/> Splitwise</div>
                        
                        <div onClick={()=>toggleMenu('repayment')} className={`${activeMenu==="repayment"?"bg-gray-600":"bg-gray-800"} px-2 py-2 cursor-pointer text-amber-50 border-b-1 border-b-gray-700 flex justify-left items-center justify-between gap-2 hover:bg-gray-700 select-none`}>
                            <div className="flex gap-2 justify-left items-center"><SlCalender size={20}/>Repayment</div>
                            <div>{openedMenu == "repayment"?(<MdKeyboardArrowDown />):(<MdKeyboardArrowRight />)}</div>
                        </div>

                        <div className={`bg-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${openedMenu == "repayment" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                            <ul>
                                <li onClick={()=>navScreen('/repayment','repayment')} className="text-white px-5 hover:bg-slate-700 py-1 cursor-pointer border-b-1 border-b-slate-700">Repayment</li>
                                <li onClick={()=>navScreen('/repayment/emi','repayment')} className="text-white px-5 hover:bg-slate-700 py-1 cursor-pointer">EMI</li>
                            </ul>
                        </div>
                        
                        <div onClick={()=>toggleMenu('settings')} className={`${activeMenu==="settings"?"bg-gray-600":"bg-gray-800"} px-2 py-2 cursor-pointer text-amber-50 border-b-1 border-b-gray-700 flex justify-left items-center justify-between gap-2 hover:bg-gray-700 select-none`}>
                            <div className="flex gap-2 justify-left items-center"><IoSettingsOutline size={20}/>Settings</div>
                            <div>{openedMenu == "settings"?(<MdKeyboardArrowDown />):(<MdKeyboardArrowRight />)}</div>
                        </div>

                        <div className={`bg-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${openedMenu == "settings" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                            <ul>
                                <li onClick={()=>navScreen('/settings/users','settings')} className="text-white px-5 hover:bg-slate-700 py-1 cursor-pointer border-b-1 border-b-slate-700">Users</li>
                            </ul>
                        </div>

                    </div>
                    
                </div>
            </div>
        </>
    )

};

export default SideBar;