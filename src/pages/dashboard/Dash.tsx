import PageTitle from "../../utils/PageTitle";
import Repayment from "./components/Repayment";
import CreditCard from "./components/CreditCard";
import { fetchRequest } from "../../services/Fetch";
import { useEffect, useState } from "react";

const Dash = () =>{
    const [loading,setLoading] = useState(true);
    const [repaymentSummary,setRepaymentSummary] = useState([]);
    const [creditCardSummary,setCreditCardSummary] = useState([]);

    const loadSummary = async () =>{
        let response = await fetchRequest({
            auth:true,
            path:"dashboard/summary",
            method:"GET"
        });

        if(response.request){
            let data = response?.data?.data;
            setCreditCardSummary(data?.credit_summary);
            setRepaymentSummary(data?.repayment_summary);
        }

        setLoading(false);
    }

    useEffect(()=>{
        loadSummary();
    },[]);

    return(
        <>  
            <PageTitle pageName="Dashboard"/>
            <div className="p-2">
                <h1 className="font-bold text-white">Dashboard</h1>
                
                <div className="pt-2 px-1 grid grid-cols-6 gap-2">
                    
                    {/* Credit Card Summary */}
                    <div className="col-span-1">
                        <CreditCard loading={loading} creditCardSummary={creditCardSummary}/>
                    </div>
                    {/* Credit Card Summary Ends*/}

                    {/* Repayment Summary */}
                    <div className="col-span-1">
                        <Repayment loading={loading} repaymentSummary={repaymentSummary}/>
                    </div>
                    {/* Repayment Summary Ends */}

                </div>

            </div>
        </>
    );
};

export default Dash;