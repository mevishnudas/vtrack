import PageTitle from "../../utils/PageTitle";
//import CreditCard from "./CreditCard0";
import { useEffect, useState } from "react";
import { fetchRequest } from "../../services/Fetch";
import CreditCardBox from "./components/CreditCardBox";
import CreditCardDetail from "./components/CreditCardDetails";


const CreditCard = () =>{
    const [creditCardList,setCreditCardList]= useState([]);
    const [selectedCreditCard,setSelectedCreditCard] = useState(0);

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
        <>  
            <PageTitle pageName="Credit Card"/>
            <div className="p-2">
                <h1 className="font-bold text-white">Credit Card</h1>
                
                <div className="pt-2 px-1">
                    
                    <div className="grid grid-cols-4 gap-2 items-start">
                                    
                        <div className="col-span-3 grid sm:grid-cols-4 gap-2">
                            {creditCardList.map((row)=>(
                                <CreditCardBox 
                                    onClick={()=>setSelectedCreditCard(row.id)}

                                    key={row.id} 
                                    info={row}
                                />
                            ))}
                        </div>

                        <div className="col-span-1">
                            {selectedCreditCard?(
                                <CreditCardDetail selectedCreditCard={selectedCreditCard}/>
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