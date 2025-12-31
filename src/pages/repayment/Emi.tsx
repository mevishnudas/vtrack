
import { useEffect,useState } from "react";
import {fetchRequest} from "../../services/Fetch";

import AddEmi from "./sections/emi/AddEmi";
import EmiList from "./sections/emi/EmiList";
import DetailEmi from "./sections/emi/DetailEmi";

const Emi = () =>{

    const [bankList,setBankList] = useState([]);
    const [userList,setUserList] = useState([]);
    const [emiStatusList,setEmiStatusList] = useState([]);
    
    const [reFreshList,setRefreshList] = useState(1);

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
    
    const loadEmiStatus = async () =>{
        
        let response = await fetchRequest({
            path:"master/emi/status",
            auth:true,
            method:"GET"
        });

        if(response.request){
            setEmiStatusList(response.data?.data);
        }
    } 
    
    const reFreshEmiList = () =>{
        setRefreshList(prev=>prev+1);
    }

    useEffect(()=>{

        loadBanks();
        loadPayee();
        loadEmiStatus();

    },[]);

    return(
        <>  
            <div className="p-4">
                  <h1 className="font-bold text-white" onClick={reFreshEmiList}>EMI Payments</h1>
                  
                  <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="grid-cols-1 text-white">
                            <AddEmi 
                                bank_list={bankList}
                                payee_list={userList}

                                reFreshEmiList={reFreshEmiList}
                            />
                        </div>

                        <div className="grid-cols-1 text-white">
                            <EmiList
                                payee_list={userList}
                                emi_status_list={emiStatusList}

                                refresh={reFreshList}
                            />
                        </div>

                        <div className="grid-cols-1 text-white">
                            <DetailEmi/>
                        </div>
                  </div>

            </div>
        </>
    );

};

export default Emi;