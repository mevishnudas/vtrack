
import { useEffect,useState } from "react";
import {fetchRequest} from "../../services/Fetch";
import {toastSuccessBottomRight,toastErrorBottomRight} from "../../utils/Toast";

import AddEmi from "./sections/emi/AddEmi";
import EmiList from "./sections/emi/EmiList";
import DetailEmi from "./sections/emi/DetailEmi";

import PageTitle from "../../utils/PageTitle";
import UpcomingEmi from "./sections/emi/UpcomingEmi";
import {format} from "date-fns";

const Emi = () =>{

    const [bankList,setBankList] = useState([]);
    const [userList,setUserList] = useState([]);
    const [emiStatusList,setEmiStatusList] = useState([]);
    const [emiPrincipleStatusList,setEmiPrincipleStatusList] = useState([]);
    
    const [selectedEmi,setSelectedEmi] = useState([]);
    //const [reFreshList,setRefreshList] = useState(1);

    const [emiList,setEmiList] = useState([]);
    const [emiLoading,setEmiLoading] = useState(false);
    const [selectedEmiStatus,setSelectedEmiStatus] = useState("OPEN");
    const [selectedPayee,setSelectedPayee] = useState(0);
    const [selectedBank,setSelectedBank] = useState(0);

    const[upcomingPayment,setUpcomingPayments] = useState([]);
    const[upcomingPaymentLoading,setUpcomingPaymentsLoading] = useState(true);

    const [yearList,setYearList] = useState([]);
    const [selectedMonth,setSelectedMonth] = useState(format(new Date(), "M"));
    const [selectedYear,setSelectedYear] = useState(format(new Date(), "yyyy"));

    const loadBanks = async () =>{
          
            let response = await fetchRequest({
              path:"master/bank/list",
              auth:true,
              method:"GET"
            });
    
            if(response.request){
                //console.log("Response ",response.data?.data);
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
            //setUserList(response.data?.data);
            let data = response.data?.data;
            const result = data.map(({ id, name, ...rest }) => ({ //formatting array
                ...rest,
                value: id,
                label: name
            }));
            
            setUserList(result);
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
    
    // const reFreshEmiList = () =>{
    //     setRefreshList(prev=>prev+1);
    // }

    const updateEMI = async (data:any[],id:number) =>{

        let response = await fetchRequest({
            path:"repayment/emi/status/update",
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
            
            loadEmiList(true);

        }else{
            toastErrorBottomRight({
                message:"Error occurred!"
            });
        }

    }

    const NoData = () =>{

        return(
            <div className="bg-slate-900 rounded-sm border-1 border-slate-800 py-2">
                <p className="text-center text-slate-200">EMI details are shown here.</p>
            </div>
        );
        
    }

    const loadEmiList = async (refresh=false) =>{
        
        setEmiLoading(true); //loading

        if(!refresh)
        { setEmiList([]);}

        let response = await fetchRequest({
            path:"repayment/emi/list",
            auth:true,
            method:"POST",
            body:{
                    status:selectedEmiStatus,
                    payee:selectedPayee,
                    bank:selectedBank
                }
        });
    
        if(response.request){
            setEmiList(response.data?.data);
        }

        setEmiLoading(false);
        loadUpcomingPayments();
    } 

    const loadUpcomingPayments = async () =>{

        setUpcomingPaymentsLoading(true);

        let response = await fetchRequest({
            path:"repayment/emi/upcoming",
            auth:true,
            method:"POST",
            body:{
                month:selectedMonth,
                year:selectedYear
            }
        });
    
        if(response.request){
            setUpcomingPayments(response.data?.data);
        }

        setUpcomingPaymentsLoading(false);
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
        loadEmiStatus();
        loadYears();
        loadEmiPrincipleStatus();

        
        //Load emi list
        loadEmiList();
        

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

                                reFreshEmiList={loadEmiList}
                            />
                        </div>

                        <div className="grid-cols-1 text-white">
                            <EmiList
                                payee_list={userList}
                                emi_status_list={emiStatusList}
                                bank_list={bankList}
                                
                                emiList={emiList}
                                loading={emiLoading}

                                selectedEmiStatus={selectedEmiStatus}
                                setSelectedEmiStatus={setSelectedEmiStatus}

                                selectedPayee={selectedPayee}
                                setSelectedPayee={setSelectedPayee}

                                selectedBank={selectedBank}
                                setSelectedBank={setSelectedBank}

                                // refresh={reFreshList}
                                selectedEmi={selectedEmi}
                                setSelectedEmi={setSelectedEmi}
                                
                                loadEmiList={loadEmiList}
                            />
                        </div>

                        <div className="grid-cols-1 text-white border-l-1 border-l-gray-800 pl-2">

                            <div className={`${selectedEmi.length!==0?"hidden":"block"}`}>
                                <UpcomingEmi 
                                    upcomingPayment={upcomingPayment} 
                                    emiList={emiList}
                                    setSelectedEmi={setSelectedEmi}
                                    upcomingPaymentLoading={upcomingPaymentLoading}
                                    loadUpcomingPayments={loadUpcomingPayments}
                                    
                                    selectedMonth={selectedMonth}
                                    setSelectedMonth={setSelectedMonth}

                                    setSelectedYear={setSelectedYear}
                                    selectedYear={selectedYear}

                                    yearList={yearList}
                                />
                            </div>

                            {selectedEmi.length!==0&&(
                                <DetailEmi
                                    emi_status_list={emiStatusList}
                                    emi_data={selectedEmi}
                                    setSelectedEmi={setSelectedEmi}

                                    emiPrincipleStatusList={emiPrincipleStatusList}
                                    updateEMI={updateEMI}
                                />
                            )}
                        </div>
                  </div>

            </div>
        </>
    );

};

export default Emi;