import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Owing from "./components/Owing";
import {fetchRequest} from "../../services/Fetch";

import PageTitle from "../../utils/PageTitle";
import { useState,useEffect } from "react";

import AddExpense from "./components/model/AddExpense";

const Splitwise = () =>{
    const [friends,setFriends] = useState([]);
    const [addExpenseModel,setAddExpenseModel] = useState(false);

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

        }
    }

    useEffect(()=>{
        loadFriends(); //load friends
    },[]);

    return(
        <>
            <PageTitle pageName="Splitwise"/>

            <div className="p-2">
                <h1 className="font-bold text-white">Splitwise</h1>

                <div className="grid grid-cols-4 text-white px-2 py-2 gap-2">
                    <div className="col-span-1"><LeftSideBar/></div>
                    <div className="col-span-2 border-l-1 border-l-gray-700"><Owing addExpense={setAddExpenseModel}/></div>
                    <div className="col-span-1"><RightSideBar/></div>
                </div>

            </div>

            <AddExpense
                openModel={addExpenseModel}
                setOpenModel={setAddExpenseModel}
                friends={friends}
            />
        </>
    );

};

export default Splitwise;