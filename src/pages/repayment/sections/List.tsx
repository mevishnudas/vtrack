import { useEffect, useState } from "react";
import PaymentDetailCard from "../../../components/cards/PaymentDetailCard";
import {fetchRequest} from "../../../services/Fetch";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { ImSpinner11 } from "react-icons/im";
import {Month} from "../../../utils/Month";

type params ={
    refreshList:number
}
const List = ({refreshList}:params) =>{
    const [repaymentList,setRepaymentList] = useState([]);
    const [loading,setLoading] = useState(false);

    const loadRepayments = async () =>{

        setLoading(true);
        setRepaymentList([]);

        let params = {
            path:"repayment/list",
            method:"POST",
            auth:true
        }
        let response = await fetchRequest(params);
        if(response.request){
            if (Array.isArray(response.data?.data)) {
                setRepaymentList(response.data?.data);
                //console.log("TEST",response.data?.data[0].payee);
            }
        }
        setLoading(false);
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

                <div className="grid grid-cols-3">
                    <div className="col-span-1">
                        <select className="w-50 border-1 border-gray-300 rounded-sm py-1 px-1 outline-none bg-gray-50">
                            {Month.map(row=>(
                                <option key={row.id} value={row.id}>{row.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <button disabled={loading} className="bg-blue-700 active:bg-blue-900 disabled:bg-blue-900 text-amber-50 px-2 py-1 rounded-sm" onClick={loadRepayments}><ImSpinner11 size={15}/></button>
                    </div>
                </div>

                {loading&&(
                    <div className="flex justify-center gap-2">
                        <CgSpinnerTwoAlt size={25} className="animate-spin"/> Gathering data...
                    </div>
                )}

                {!loading&&repaymentList.length===0&&(
                    <div className="text-center text-gray-700 flex gap-2 justify-center items-center">
                        <span>No Data.</span> <span className="flex justify-center items-center gap-2 font-bold cursor-pointer" onClick={loadRepayments}><ImSpinner11 size={15}/>Refresh</span>
                    </div>
                )}

                

                <div className="pt-2">
                    {repaymentList.map((row, index)=>(
                        <PaymentDetailCard listData={row} key={index} className="mb-4"/>
                    ))}
                </div>
            </div>
        </>
    );
};

export default List;