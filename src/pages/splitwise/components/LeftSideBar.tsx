import { useState } from "react";
import { SimpleInput } from "../../../components/formElements/SimpleInputs";
import { IoCloseSharp } from "react-icons/io5";
type LeftSideBarProps = {
    friends:any[],
    setSelectedFriend:()=>void,
    searchUser:()=>void,
    clearSearchResult:()=>void,
    clearSearch:any[],
    inputRef:any[]
};

const LeftSideBar = ({friends,setSelectedFriend,searchUser,clearSearch,inputRef,clearSearchResult}:LeftSideBarProps) =>{
    const [showFriendList,setShowFriendList] = useState(false);

    return(
        <>
            <div>
                <div>
                    
                    <div className="">
                        <ul className="mb-2">
                            <li className="px-2 py-1 text-white hover:bg-stone-300 hover:text-black cursor-pointer select-none" onClick={()=>setSelectedFriend(false)}>Overview</li>
                            <li className="px-2 py-1 text-white hover:bg-stone-300 hover:text-black cursor-pointer select-none">Recent Activity</li>
                        </ul>
                    </div>

                    <div className="w-80 px-1 py-3 border-t-1  border-t-slate-700">
                        <SimpleInput 
                            customClassName="border-1 rounded-sm bg-slate-900 border-gray-600 text-sm w-full"
                            placeholder="Search"
                            autoFocus 

                            onKeyUp={searchUser}
                            ref={inputRef}
                        />

                        {clearSearch&&(
                        <div className="relative bg-green-300 items-end justify-end flex">
                            <div className="cursor-pointer absolute h-7.5 px-2 text-white bg-red-400 flex justify-center items-center rounded-r-sm" onClick={clearSearchResult}>
                                <IoCloseSharp size={18}/>
                            </div>
                        </div>
                        )}
                    </div>

                    <div>
                        <h1 className=" px-2 py-1 font-bold text-green-300 cursor-pointer select-none" onClick={()=>setShowFriendList(!showFriendList)}>Friends</h1>
                            
                            <div className="max-h-120 custom-overflow-track overflow-y-auto pr-2">
                                {showFriendList&&(
                                    <ul>
                                        {friends.map((row)=>(
                                            <li key={row.value} className="px-2 py-1 border-b-1 border-slate-700 hover:bg-slate-700 cursor-pointer">{row.label}</li>    
                                        ))}
                                    </ul>
                                )}
                            </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default LeftSideBar;
