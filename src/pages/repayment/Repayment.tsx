import React, { useState,useEffect } from "react";
import List from "./sections/List";
import Update from "./sections/Update";
import Add from "./sections/Add";
import { useNavigate } from "react-router-dom";
import {fetchRequest} from "../../services/Fetch";

const Repayment = () =>{
    const navigate = useNavigate()
    const [refreshList,setRefreshList] = useState(0);
    const [bankList,setBankList] = useState([]);

    const refreshTheList = () =>{
        setRefreshList(prev=>prev+1);
    }

    const loadBanks = async () =>{
      
        let response = await fetchRequest({
          path:"master/bank/list",
          auth:true,
          method:"GET"
        },navigate);

        if(response.request){
            console.log("Response ",response.data?.data);
            //setBankList(response.data?.data);
        }
    }

    const loadPayee = () =>{
      
    }

    useEffect(()=>{
      
      loadBanks(); //load bank list
      
      return ()=>{

      }

    });
    return(<>
             
             <div className="p-2">
                  <h1 className="font-bold">Repayment</h1>

                  <div className="grid grid-cols-3">
                    
                      <div className="col-span-1 py-2 px-1"><List refreshList={refreshList}/></div>
                      
                      <div className="col-span-2 py-2 px-1">

                          <div className="grid grid-cols-2">
                            <div className="col-span-1"><Update/></div>
                            <div className="col-span-1 px-2">
                              <Add 
                                bankList={bankList} 
                                refreshList={refreshTheList}
                              /></div>
                          </div>

                      </div>

                  </div>
                
             </div>
           </>);   
};

export {Repayment};