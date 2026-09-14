import {SearchWithClose } from "../../../../components/formElements/SuperInputs";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

type UserListFilterProps = {
    friends:any[],
    loadUserSummary:Function,
    selectedUser:any[]
}
const UserListFilter = ({friends,loadUserSummary,selectedUser}:UserListFilterProps) =>{
    const [friendsFiltered,setFriendsFiltered] = useState([]);
    const [searchKey,setSearchKey] = useState("");

    const searchFilter = (event:any) =>{
        
        let search = event.target.value.toLowerCase();
        const filteredUsers = friends.filter(row =>
            row.label.toLowerCase().includes(search)
        );
        setFriendsFiltered(filteredUsers);
        setSearchKey(search);
    }

    const clearSearch = () =>{
        setSearchKey("");
        setFriendsFiltered(friends);  
    }

    useEffect(()=>{
        setFriendsFiltered(friends);
    },[friends]);

    return(
        <>
        <div className="border-r-1 border-slate-700 rounded-sm  overflow-hidden">       
            <SearchWithClose 
                placeholder={"Search here..."}
                closeBtn={searchKey}
            
                autoFocus={true}
                onKeyUp={searchFilter} 
                autoComplete="off"
                clearSearch={clearSearch}
            />

            <div className="max-h-50 sm:max-h-130 overflow-y-auto overflow-hidden custom-overflow-track">
                <ul>
                    {friendsFiltered.map((row)=>(
                        <li key={row.value} onClick={()=>loadUserSummary(row.value,row.label)} 
                            className={`flex justify-between items-center
                                        hover:bg-teal-950 
                                        cursor-pointer 
                                        px-2 py-1 border-b-1 
                                        border-b-teal-800
                                        ${selectedUser?.id==row.value&&(
                                            "bg-teal-950"
                                        )}
                                        `}
                            >
                            <label className="cursor-pointer select-none">{row.label}</label>
                            <label>{selectedUser?.id==row.value&&(<IoIosArrowForward />)}</label>
                        </li>
                    ))}
                </ul>
            </div>
            
            {friendsFiltered.length==0&&(
                <p className="text-center text-xs text-slate-400 py-2">Not found !</p>
            )}
        </div>
        </>
    );
}

export default UserListFilter;