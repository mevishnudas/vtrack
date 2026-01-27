import { Link } from "react-router-dom";
import PageTitle from "../../utils/PageTitle";
import CreditCardBox from "./components/CreditCardBox";
import { useEffect, useState } from "react";
import { fetchRequest } from "../../services/Fetch";
//import Card from "./components/Card";

const Dash = () =>{
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
        // loadCreditCardList(); //load credit card list

    },[]);
    return(
        <>  
            <PageTitle pageName="Dashboard"/>
            <div className="p-2">
                <h1 className="font-bold text-white">Dashboard</h1>
                
                <div className="pt-2 px-1">
                    <div className="grid sm:grid-cols-5 gap-2">
                        {creditCardList.map((row)=>(
                            <CreditCardBox key={row.id} info={row}/>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Dash;