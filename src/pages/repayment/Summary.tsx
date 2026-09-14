import React,{ useEffect, useState } from "react";
import PageTitle from "../../utils/PageTitle";
import UserListFilter from "./sections/summary/UserListFilter";
import { fetchRequest } from "../../services/Fetch";
import UserSummary from "./sections/summary/UserSummary";
import OverallSummary from "./sections/summary/OverallSummary";

const Summary = () =>{
    const [friends,setFriends] = useState([]);
    const [selectedUser,setSelectedUser] = useState();
    const [loadingOverallSummary,setLoadingOverallSummary] = useState(true);
    const [overallSummaryList,setOverallSummaryList] = useState([]);

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
    const clearSelection = () =>{
        setSelectedUser(null);
    }

    const loadOverallSummary = async () =>{
        setLoadingOverallSummary(true);
        let response = await fetchRequest({
          path:"repayment/overall/summary",
          auth:true,
          method:"GET"
        });

        if(response.request){
            let data = response.data?.data;
            setOverallSummaryList(data);
        }
        setLoadingOverallSummary(false);
    }

    useEffect(()=>{
        loadFriends();
        loadOverallSummary();

        return ()=>{
            setSelectedUser(null);
        }
    },[]);
    return(
        <>
            <PageTitle pageName="Summary"/>
            <div className="p-4">
                <h1 className="font-bold text-white">Repayment Summary</h1>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-2">
                    <div className="text-white col-span-1 sm:col-span-2">

                        {/* User List */}
                        <UserListFilter friends={friends} loadUserSummary={loadUserSummary} selectedUser={selectedUser}/>
                        {/* User List End*/}

                    </div>
                    <div className="text-white col-span-1 sm:col-span-10">
                            
                        {/* Summary Start */}
                        {selectedUser&&(
                            <UserSummary userInfo={selectedUser} clearSelection={clearSelection}/>
                        )}

                        {!selectedUser&&(
                            <div className="min-h-100 rounded-xl overflow-hidden">
                                <OverallSummary 
                                    loadingOverallSummary={loadingOverallSummary} 
                                    overallSummaryList={overallSummaryList}
                                    loadUserSummary={loadUserSummary}
                                />
                            </div>
                        )}
                        {/* Summary End */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary;