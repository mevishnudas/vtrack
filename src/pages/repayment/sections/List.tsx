import { useEffect } from "react";
import PaymentDetailCard from "../../../components/cards/PaymentDetailCard";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { ImSpinner11 } from "react-icons/im";
import { FaFilter } from "react-icons/fa";
import {Month} from "../../../utils/Month";

type params ={
    userList:any[],
    selectedUser:number,
    setSelectedUser:any,

    yearList:any[],

    selectedYear:string,
    setSelectedYear:any,

    selectedMonth:string,
    setSelectedMonth:any,
    
    loading:boolean,
    repaymentList:any[],
    selectedPaymentInfo:Function,

    loadRepayments:Function
}

const List = ({
    userList,
    selectedUser,
    setSelectedUser,

    yearList,
    selectedPaymentInfo,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    loading,
    repaymentList,

    loadRepayments
}:params) =>{
    
    // useEffect(()=>{
        
    //     console.log("First ",repaymentList);

    // },[loading,repaymentList]);

    return(
        <>  
            <div>
                <div className="grid grid-cols-4 pb-1">
                    <div className="col-span-1 pr-2">
                        <select value={selectedYear}  
                            onChange={(e)=>setSelectedYear(e.target.value)}
                            className="w-full border-1 border-gray-700 rounded-sm py-1 px-1 outline-none bg-gray-800 text-white">
                            {yearList.map((row,index)=>(
                                <option value={row} key={index}>{row}</option>
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
                                    <option value={row.id} key={row.id}>{row.name}</option>
                                ))}
                            </select>
                    </div>
                    <div className="col-span-1 flex justify-end">
                        <button disabled={loading} className="bg-blue-700 active:bg-blue-900 disabled:bg-blue-900 text-amber-50 px-2 py-1 rounded-sm" onClick={loadRepayments}><FaFilter size={15}/></button>
                    </div>
                </div>
                
                {!loading&&repaymentList.length===0&&(
                    <div className="text-center pt-2  flex gap-2 justify-center items-center text-gray-300">
                        <span>No Data.</span> <span className="flex justify-center items-center gap-2 font-bold cursor-pointer" onClick={loadRepayments}><ImSpinner11 size={15}/>Refresh</span>
                    </div>
                )}

                
                <div className="relative max-h-200">
                    
                    {loading&&(
                        <div className="absolute inset-0 flex justify-center items-center gap-2 py-5 text-white text-shadow-gray-300 bg-gray-950/30 text-sm">
                            <CgSpinnerTwoAlt size={20} className="animate-spin"/> Gathering data...
                        </div>
                    )}

                    <div className={`pt-2 overflow-x-hidden max-h-200 custom-overflow-track pr-1 ${loading&&"pointer-events-none"}`} >

                        {repaymentList.map((row, index)=>(

                            <div className="cursor-pointer" key={index}  onClick={()=>selectedPaymentInfo(row)}>
                                <PaymentDetailCard 
                                    listData={row} 
                                    
                                    className="mb-4"
                                />
                            </div>

                        ))}
                    </div>


                </div>

            </div>
        </>
    );
};

export default List;