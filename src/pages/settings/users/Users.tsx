import { useState,useEffect,useRef  } from "react";
import {fetchRequest} from "../../../services/Fetch";
import PageTitle from "../../../utils/PageTitle";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";

import UserAdd from "./components/UserAdd";
import { CustomInput } from "../../../components/formElements/input";

const Users = () =>{
    const [userList,setUserList] = useState([]);
    const [safeUserList,setSafeUserList] = useState([]);
    const [usersLoading,setUserLoading] = useState(false);
    const [clearSearch,setClearSearch] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const loadUsers = async () =>{
        setUserLoading(true);

        let response = await fetchRequest({
          path:"users/list",
          auth:true,
          method:"GET"
        });

        setUserLoading(false);
        
        if(response.request){
            let data = response.data?.data;
            setUserList(data);
            setSafeUserList(data);
        }
    }

    const refreshAfter = async () =>{
        loadUsers(); //load users
    }

    const searchUser = async (event) =>{

        let search = event.target.value.trim();
        let userList = safeUserList;

        if(search.length!=""){

            const filtered = userList.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
            
            setUserList(filtered);
            setClearSearch(true);

        }else{
            clearSearchResult();
        }

    }

    const clearSearchResult = () =>{
        
        inputRef.current.value = "";
        setClearSearch(false);
        setUserList(safeUserList);
    }

    useEffect(()=>{
        loadUsers(); //load users
    },[]);

    
    return(<>
        <PageTitle pageName="Users"/>

        <div className="p-2">
            <h1 className="font-bold text-white">Users</h1>
            
            <div className="grid grid-cols-4">
                
                <div className="max-h-140 pt-2 overflow-x-auto custom-overflow-track">
                    <div className="px-2">
                        <CustomInput
                            name="search"
                            placeholder="Search"
                            
                            onKeyUp={searchUser}
                            ref={inputRef}
                            
                        />
                        {clearSearch&&(
                            <div className="relative bg-green-300 items-end justify-end flex">
                                <div className="cursor-pointer absolute h-8.5 px-2 text-white bg-red-400 flex justify-center items-center rounded-r-sm" onClick={clearSearchResult}>
                                    <IoCloseSharp size={18}/>
                                </div>
                            </div>
                        )}
                    </div>

                    {usersLoading&&(
                        <div className="flex justify-center gap-2 pt-2 text-gray-200 text-sm">
                            <CgSpinnerTwoAlt size={20} className="animate-spin"/> Gathering data...
                        </div>
                    )}

                    {userList.length==0&&!usersLoading&&(
                        <p className="text-center text-gray-600">No data</p>
                    )}

                    <div className="pt-2">
                        {userList.map(row=>(
                            <p key={row.id} className="text-white border-b-1 border-b-gray-800 py-1 pl-2 cursor-pointer select-none hover:bg-slate-600">{row.name}</p>
                        ))}
                    </div>

                </div>
                <div className="col-span-3 p-2">

                    <div className="w-60 bg-slate-900 rounded-sm overflow-hidden">
                        <div className="bg-sky-800">
                            <h1 className="text-white px-2 py-1">New User</h1>
                        </div>

                        <div className="px-2 pt-1 pb-2">
                            <UserAdd refreshAfter={refreshAfter}/>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </>
    );
};

export default Users;