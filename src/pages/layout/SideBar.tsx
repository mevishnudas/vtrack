import { Link,useNavigate  } from "react-router-dom";

type props ={
    setSideBarShow:any,
    sideBarShow:boolean
};
const SideBar = ({setSideBarShow,sideBarShow}:props) =>{  
    const navigate = useNavigate();

    const closeSideBar = () =>{
        setSideBarShow(false);
    }

    const navScreen = (page:string) =>{
        closeSideBar();
        navigate(page);
    }

    return(
        <>  
            <div className={`bg-gray-900/10 backdrop-blur-[1px] backdrop-brightness-90 fixed top-0 h-screen w-screen                       
                            
                                duration-500 
                                ${sideBarShow?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}

                            `} onClick={closeSideBar}>

                                
                <div className={`bg-gray-900 absolute w-55 h-screen
                                    duration-350 
                                    ${sideBarShow?"-translate-x-0":"-translate-x-50"}

                                `} onClick={(e) => e.stopPropagation()}>
                    <div><h2 className="text-center text-amber-50 py-2 font-bold">VTrack</h2></div>
                    <ul>
                        <li onClick={()=>navScreen('/')} className="bg-amber-600 px-2 py-2 cursor-pointer">Dashboard</li>
                        <li onClick={()=>navScreen('/repayment')}className="bg-amber-600 px-2 py-2 cursor-pointer">Repayment</li>
                    </ul>
                </div>
            </div>
        </>
    )

};

export default SideBar;