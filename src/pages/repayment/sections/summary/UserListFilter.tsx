import {SearchWithClose } from "../../../../components/formElements/SuperInputs";
import { useEffect, useState } from "react";

type UserListFilterProps = {
    friends:any[]
}
const UserListFilter = ({friends}:UserListFilterProps) =>{
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

                clearSearch={clearSearch}
            />

            <div className="max-h-130 overflow-y-auto overflow-hidden custom-overflow-track">
                <ul>
                    {friendsFiltered.map((row)=>(
                        <li key={row.value} className="hover:bg-teal-950 cursor-pointer px-2 py-1 border-b-1 border-b-teal-800">
                            {row.label}
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