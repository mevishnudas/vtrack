import { useEffect, useState } from "react";
import { fetchRequest } from "../../services/Fetch";
import CreditCardBox from "./components/CreditCardBox";
import { FaArrowLeft } from "react-icons/fa";

const CreditCard = () =>{

    const [creditCardList,setCreditCardList]= useState([]);

    const loadCreditCardList = async () =>{

        let response = await fetchRequest({
                            path:"master/credit-card/list",
                            method:"GET",
                            auth:true
                        });

        if(response.request){
            setCreditCardList(response.data.data);
        }
    }

    useEffect(()=>{
        loadCreditCardList(); //load credit card list
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
        <div>
            <div className="grid grid-cols-4 gap-2 items-start">
                            
                <div className="col-span-3 grid sm:grid-cols-4 gap-2">
                    {creditCardList.map((row)=>(
                        <CreditCardBox key={row.id} info={row}/>
                    ))}
                </div>

                <div className="col-span-1">
                    {/* <CreditUsage/> */}

                    <div className="bg-slate-900 rounded-sm border-1 border-slate-700">
                        <div className="py-2 px-1">
                            <h1 className="text-white font-bold px-2"><FaArrowLeft size={20} className="text-white"/> ICICI Platinum</h1>
                            <h1 className="text-white px-2 text-sm">**** 4973</h1>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default CreditCard;