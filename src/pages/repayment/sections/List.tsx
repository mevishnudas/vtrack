import { useEffect, useState } from "react";
import PaymentDetailCard from "../../../components/cards/PaymentDetailCard";
import {fetchRequest} from "../../../services/Fetch";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { ImSpinner11 } from "react-icons/im";
import { FaFilter } from "react-icons/fa";
import {Month} from "../../../utils/Month";
import { format } from "date-fns";

type params ={
    refreshList:number,
    userList:any[],
    yearList:any[]
}

const List = ({refreshList,userList,yearList}:params) =>{
    const [repaymentList,setRepaymentList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [selectedMonth,setSelectedMonth] = useState(format(new Date(), "M"));
    const [selectedYear,setSelectedYear] = useState(format(new Date(), "Y"));
    const [selectedUser,setSelectedUser] = useState(0);

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

    const test = () =>{
        console.log(format(new Date(), "M"));
    }
    return(
        <>  
            <div>
                <div className="grid grid-cols-4 pb-1">
                    <div className="col-span-1 pr-2">
                        <select value={selectedYear}  
                            onChange={(e)=>setSelectedYear(e.target.value)}
                            className="w-full border-1 border-gray-700 rounded-sm py-1 px-1 outline-none bg-gray-800 text-white">
                            {yearList.map(row=>(
                                <option value={row}>{row}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-1">
                        <select value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)} className="w-full border-1 border-gray-700 rounded-sm py-1 px-1 outline-none bg-gray-800 text-white">
                            {Month.map(row=>(
                                <option key={row.id} value={row.id}>{row.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-1 pl-2">
                            <select value={selectedUser} onChange={(e)=>setSelectedUser(e.target.value)} className="w-full border-1 border-gray-700 rounded-sm py-1 px-1 outline-none bg-gray-800 text-white">
                                <option value={0}>All</option>
                                {userList.map(row=>(
                                    <option value={row.id}>{row.name}</option>
                                ))}
                            </select>
                    </div>
                    <div className="col-span-1 flex justify-end">
                        <button disabled={loading} className="bg-blue-700 active:bg-blue-900 disabled:bg-blue-900 text-amber-50 px-2 py-1 rounded-sm" onClick={loadRepayments}><FaFilter size={15}/></button>
                    </div>
                </div>

                {loading&&(
                    <div className="flex justify-center gap-2 pt-2 text-gray-200">
                        <CgSpinnerTwoAlt size={25} className="animate-spin"/> Gathering data...
                    </div>
                )}

                {!loading&&repaymentList.length===0&&(
                    <div className="text-center pt-2 text-gray-700 flex gap-2 justify-center items-center text-gray-200">
                        <span>No Data.</span> <span className="flex justify-center items-center gap-2 font-bold cursor-pointer" onClick={loadRepayments}><ImSpinner11 size={15}/>Refresh</span>
                    </div>
                )}

                <div className="pt-2 overflow-x-auto max-h-150 custom-overflow-track pr-1">
                    {repaymentList.map((row, index)=>(
                        <PaymentDetailCard listData={row} key={index} className="mb-4"/>
                    ))}
                </div>
            </div>
        </>
    );
};

export default List;