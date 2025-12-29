
import { useEffect,useState } from "react";
import {fetchRequest} from "../../services/Fetch";

import AddEmi from "./sections/emi/AddEmi";

const Emi = () =>{

    const [bankList,setBankList] = useState([]);
    const [userList,setUserList] = useState([]);
    const [yearList,setYearList] = useState([]);

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
    
    const loadYears = async () =>{
        
        let response = await fetchRequest({
            path:"master/year/list",
            auth:true,
            method:"GET"
        });

        if(response.request){
            setYearList(response.data?.data);
        }
    } 
    
   

    useEffect(()=>{

        loadBanks();
        loadPayee();
        loadYears();

    },[]);

    return(
        <>
            <div className="p-4">
                  <h1 className="font-bold text-white">EMI Payments</h1>
                  
                  <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="grid-cols-1 text-white">
                            <AddEmi 
                                bank_list={bankList}
                                payee_list={userList}
                            />
                        </div>

                        <div className="grid-cols-1 text-white">Listing Area</div>
                        <div className="grid-cols-1 text-white">Detail & Update</div>
                  </div>

            </div>
        </>
    );

};

export default Emi;