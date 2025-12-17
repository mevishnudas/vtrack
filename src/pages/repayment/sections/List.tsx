import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentDetailCard from "../../../components/cards/PaymentDetailCard";
import {fetchRequest} from "../../../services/Fetch";
import { clamp } from './../../../../node_modules/date-fns/clamp';

type params ={
    refreshList:number
}
const List = ({refreshList}:params) =>{
    const navigate = useNavigate();
    const [repaymentList,setRepaymentList] = useState([]);

    const loadRepayments = async () =>{

        let params = {
            path:"repayment/list",
            method:"POST",
            auth:true
        }
        let response = await fetchRequest(params,navigate);
        if(response.request){
            if (Array.isArray(response.data?.data)) {
                setRepaymentList(response.data?.data);
                //console.log("TEST",response.data?.data[0].payee);
            }
        }
    }


    useEffect(function(){
        
        loadRepayments(); //Load Repayments

        //return
        return ()=>{

        }

    },[refreshList]);

    return(
        <>  
            <div>
                {repaymentList.map((row, index)=>(
                    <PaymentDetailCard listData={row} key={index} className="mb-4"/>
                ))}
            </div>
        </>
    );
};

export default List;