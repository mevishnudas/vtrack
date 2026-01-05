
import { useEffect,useState } from "react";
import {fetchRequest} from "../../services/Fetch";
import {toastSuccessBottomRight,toastErrorBottomRight} from "../../utils/Toast";

import AddEmi from "./sections/emi/AddEmi";
import EmiList from "./sections/emi/EmiList";
import DetailEmi from "./sections/emi/DetailEmi";

import PageTitle from "../../utils/PageTitle";
const Emi = () =>{

    const [bankList,setBankList] = useState([]);
    const [userList,setUserList] = useState([]);
    const [emiStatusList,setEmiStatusList] = useState([]);
    const [emiPrincipleStatusList,setEmiPrincipleStatusList] = useState([]);
    
    const [selectedEmi,setSelectedEmi] = useState([]);
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

    const loadEmiPrincipleStatus = async () =>{
        let response = await fetchRequest({
            path:"master/emi/principle/status",
            auth:true,
            method:"GET"
        });

        if(response.request){
            setEmiPrincipleStatusList(response.data?.data);
        }
    }
    
    const reFreshEmiList = () =>{
        setRefreshList(prev=>prev+1);
    }

    const updateEMI = async (data:any[],id:number) =>{

        let response = await fetchRequest({
            path:"master/emi/status/update",
            auth:true,
            method:"POST",
            body:{
                id:id,
                paid:data.paid,
                status:data.status,
                remarks:data.remarks
            }
        });

        if(response.request){
            toastSuccessBottomRight({
                message:"Updated Successfully!"
            });
            setSelectedEmi(prev=>({
                ...prev,
                paid:data.paid,
                status:data.status,
                remarks:data.remarks
            }));
            reFreshEmiList();
        }else{
            toastErrorBottomRight({
                message:"Error occurred!"
            });
        }

    }

    const NoData = () =>{

        return(
            <div className="bg-slate-900 rounded-sm border-1 border-slate-800 py-2">
                <p className="text-center text-slate-200">Selected data appears here.</p>
            </div>
        );
        
    }
    useEffect(()=>{

        loadBanks();
        loadPayee();
        loadEmiStatus();
        loadEmiPrincipleStatus();

    },[]);

    return(
        <>  
            <PageTitle pageName="EMI"/>
            
            <div className="p-4">
                  <h1 className="font-bold text-white">EMI Payments</h1>
                  
                  <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-4 gap-5 sm:mt-2">
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
                                selectedEmi={setSelectedEmi}
                            />
                        </div>

                        <div className="grid-cols-1 text-white">
                            {selectedEmi.length==0?(<NoData/>):(
                            <DetailEmi
                                emi_status_list={emiStatusList}
                                emi_data={selectedEmi}
                                emiPrincipleStatusList={emiPrincipleStatusList}
                                updateEMI={updateEMI}
                            />)}
                        </div>
                  </div>

            </div>
        </>
    );

};

export default Emi;