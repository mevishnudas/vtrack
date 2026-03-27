import PageTitle from "../../utils/PageTitle";
import Repayment from "./components/Repayment";
import CreditCard from "./components/CreditCard";
import { fetchRequest } from "../../services/Fetch";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Emi from "./components/Emi";

const Dash = () =>{
    const navigate = useNavigate();
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
                
                <div className="grid xl:grid-cols-[20%_22%_22%] gap-2">
                    
                    {/* Credit Card Summary */}
                    <div className="cursor-pointer" onClick={()=>navigate('/credit-card')}>
                        <CreditCard loading={loading} creditCardSummary={creditCardSummary}/>
                    </div>
                    {/* Credit Card Summary Ends*/}

                    {/* Repayment Summary */}
                    <div className="cursor-pointer" onClick={()=>navigate('/repayment')}>
                        <Repayment loading={loading} repaymentSummary={repaymentSummary}/>
                    </div>
                    {/* Repayment Summary Ends */}

                    <div className="cursor-pointer" onClick={()=>navigate('/repayment/emi')}>
                        <Emi/>                        
                    </div>

                </div>

            </div>
        </>
    );
};

export default Dash;