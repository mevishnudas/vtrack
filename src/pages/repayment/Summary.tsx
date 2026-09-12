import React,{ useEffect, useState } from "react";
import PageTitle from "../../utils/PageTitle";
import UserListFilter from "./sections/summary/UserListFilter";
import { fetchRequest } from "../../services/Fetch";
import UserSummary from "./sections/summary/UserSummary";

const Summary = () =>{
    const [friends,setFriends] = useState([]);
    const [selectedUser,setSelectedUser] = useState();
    
    const loadFriends = async () =>{
        
        let response = await fetchRequest({
          path:"users/friends/list",
          auth:true,
          method:"GET"
        });

        if(response.request){

            let data = response.data?.data;
            const result = data.map(({ id, name, ...rest }) => ({ //formatting array
                ...rest,
                value: id,
                label: name
            }));

            setFriends(result); //set value to useState
            //setFriendsFilteredList(result); // set filtered list
            //console.log(result);
        }
    }

    // type loadUserSummaryProps = {
    //     id:Number
    // }
    const loadUserSummary = (id:Number,name:String) =>{
        // alert(id)
        setSelectedUser({
            "id":id,
            "name":name
        });
    }

    useEffect(()=>{
        //alert("Hi");
        loadFriends();

        return ()=>{
            setSelectedUser(null);
        }
    },[]);
    return(
        <>
            <PageTitle pageName="Summary"/>
            <div className="p-4">
                <h1 className="font-bold text-white">Repayment Summary</h1>

                <div className="grid grid-cols-12 gap-2 pt-2">
                    <div className="text-white col-span-2">

                        {/* User List */}
                        <UserListFilter friends={friends} loadUserSummary={loadUserSummary} selectedUser={selectedUser}/>
                        {/* User List End*/}

                    </div>
                    <div className="text-white col-span-10">
                            
                        {/* Summary Start */}
                        {selectedUser&&(
                            <UserSummary userInfo={selectedUser}/>
                        )}

                        {/* {!selectedUser&&(
                            <h1>Test</h1>
                        )} */}
                        {/* Summary End */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary;