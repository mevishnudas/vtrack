import { useState } from "react";

type LeftSideBarProps = {
    friends:any[]
};

const LeftSideBar = ({friends}:LeftSideBarProps) =>{
    const [showFriendList,setShowFriendList] = useState(false);

    return(
        <>
            <div>

                <div>
                    
                    <div className="">
                        <ul>
                            <li className="px-2 py-1 text-white hover:bg-stone-300 hover:text-black cursor-pointer select-none">Overview</li>
                            <li className="px-2 py-1 text-white hover:bg-stone-300 hover:text-black cursor-pointer select-none">Recent Activity</li>
                        </ul>
                    </div>

                    <div>
                        <h1 className=" px-2 py-1 font-bold text-green-300 cursor-pointer select-none" onClick={()=>setShowFriendList(!showFriendList)}>Friends</h1>
                        {showFriendList&&(
                            <ul>
                                {friends.map((row)=>(
                                    <li className="px-2 py-1 border-b-1 border-slate-700 hover:bg-slate-700 cursor-pointer">{row.label}</li>    
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
                
            </div>
        </>
    );
};

export default LeftSideBar;
