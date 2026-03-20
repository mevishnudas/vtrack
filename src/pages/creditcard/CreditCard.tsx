import PageTitle from "../../utils/PageTitle";
//import CreditCard from "./CreditCard0";
import { useEffect, useState } from "react";
import { fetchRequest } from "../../services/Fetch";
import CreditCardBox from "./components/CreditCardBox";
import CreditCardDetail from "./components/CreditCardDetails";
import { VscLoading } from "react-icons/vsc";

const CreditCard = () =>{
    const [loading,setLoading] = useState(true);
    const [creditCardList,setCreditCardList]= useState([]);
    const [selectedCreditCard,setSelectedCreditCard] = useState(0);
    const [creditCardPaymentStatusList,setCreditCardPaymentStatusList] = useState([]);

    const [creditCardDetail,setCreditCardDetail] = useState([]);
    const [creditCardPaymentHistory,setCreditCardPaymentHistory] = useState([]);
    const [creditCardInfoLoading,setCreditCardInfoLoading] = useState(true);

    const loadCreditCardList = async () =>{
        
        setLoading(true);
        let response = await fetchRequest({
                            path:"credit-card/list",
                            method:"GET",
                            auth:true
                        });

        if(response.request){
            setCreditCardList(response.data.data);
        }
        setLoading(false);
    }

    const loadCreditCardDetails = async (id:any,refresh=false) =>{
        setSelectedCreditCard(id);

        if(!refresh){
            setCreditCardInfoLoading(true); //start loading
        }
        
        let response = await fetchRequest({
            path:"credit-card/detail",
            method:"POST",
            auth:true,
            body:{
                id:id
            }
        });

        if(response.request){
            let cardInfo = response.data?.data?.card_info;
            let cardPayments = response.data?.data?.payment_history;

            setCreditCardDetail(cardInfo);
            setCreditCardPaymentHistory(cardPayments);
        }

        setCreditCardInfoLoading(false); //Loading false

    }
    const checkCardDetail = (id:any) =>{
        loadCreditCardDetails(id);
    }

    const loadCreditCardPaymentStatus = async () =>{

         let response = await fetchRequest({
            path:"master/credit-card/payment/status",
            method:"GET",
            auth:true
        });

        if(response.request){
            let status_list = response.data?.data;
            setCreditCardPaymentStatusList(status_list);
            //console.log(status_list);
        }
        

    }

    const reSync = () =>{
        loadCreditCardList();

        if(creditCardDetail?.id){
            loadCreditCardDetails(creditCardDetail?.id,true);
        }
    }

    useEffect(()=>{
        loadCreditCardList(); //load credit card list
        loadCreditCardPaymentStatus();

    },[]);

    const CreditUsage = () =>{
        return(
            <div className="bg-slate-900 rounded-sm border-1 border-slate-700">
                <h1 className="text-center text-gray-300 font-bold pt-2">Credit Usage</h1>
                <img src="/vtrack/assets/charts/pichart.png" alt="Credit Card usage" />
            </div>
        );
    }

    return(
        <>  
            <PageTitle pageName="Credit Card"/>
            <div className="p-2">
                <h1 className="font-bold text-white flex gap-2 items-center">Credit Card {loading&&(<VscLoading className="animate-spin"/>)}</h1>
                
                <div className="pt-2 px-1">
                    
                    <div className="grid grid-cols-4 gap-2 items-start">
                                    
                        <div className={`col-span-3 ${loading&&("cursor-progress")}`}>
                            <div className={`grid sm:grid-cols-4 gap-2 ${loading&&("pointer-events-none")}`}>
                            {creditCardList.map((row)=>(
                                <CreditCardBox 
                                    onClick={()=>checkCardDetail(row.id)}

                                    key={row.id} 
                                    info={row}
                                />
                            ))}
                            </div>
                        </div>

                        <div className="col-span-1">
                            {selectedCreditCard?(
                                <CreditCardDetail 
                                    selectedCreditCard={selectedCreditCard}
                                    setSelectedCreditCard={setSelectedCreditCard}

                                    creditCardDetail={creditCardDetail}
                                    
                                    creditCardInfoLoading={creditCardInfoLoading}
                                    creditCardPaymentHistory={creditCardPaymentHistory}

                                    creditCardPaymentStatusList={creditCardPaymentStatusList}
                                    reSync={reSync}
                                />
                            ):(
                                <CreditUsage/>
                            )}
                        </div>
                    </div>
      
                </div>

            </div>
        </>
    );
};

export default CreditCard;