import React, { useState,useEffect } from "react";
import List from "./sections/List";
import Update from "./sections/Update";
import Add from "./sections/Add";
import {fetchRequest} from "../../services/Fetch";

const Repayment = () =>{
    const [refreshList,setRefreshList] = useState(0);
    const [bankList,setBankList] = useState([]);
    const [userList,setUserList] = useState([]);

    const refreshTheList = () =>{
        setRefreshList(prev=>prev+1);
    }

    const loadBanks = async () =>{
      
        let response = await fetchRequest({
          path:"master/bank/list",
          auth:true,
          method:"GET"
        });

        if(response.request){
            console.log("Response ",response.data?.data);
            setBankList(response.data?.data);
        }
    }

    const loadPayee = async () =>{
        
        let response = await fetchRequest({
          path:"users/list",
          auth:true,
          method:"GET"
        });

        if(response.request){
            //console.log("Response ",response.data?.data);
            setUserList(response.data?.data);
        }
    }

    useEffect(()=>{
      
      loadBanks(); //load bank list
      loadPayee(); //load payee list

      return ()=>{

      }

    },[]);
    return(<>
             
             <div className="p-2">
                  <h1 className="font-bold">Repayment</h1>

                  <div className="grid grid-cols-3">
                    
                      <div className="col-span-1 py-2 px-1">
                        <List refreshList={refreshList}/>
                      </div>
                      
                      <div className="col-span-2 py-2 px-1">

                          <div className="grid grid-cols-2">
                            <div className="col-span-1"><Update/></div>
                            <div className="col-span-1 px-2">
                              <Add 
                                bankList={bankList} 
                                userList={userList}
                                refreshList={refreshTheList}
                              />
                            </div>
                          </div>

                      </div>

                  </div>
                
             </div>
           </>);   
};

export {Repayment};