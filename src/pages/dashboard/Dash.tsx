import PageTitle from "../../utils/PageTitle";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";

const Dash = () =>{

    type RepaymentSummaryDetailsProps ={
        title:string,
        total:Number,
        received:Number,
        pending:Number,
        partially:Number,
    }
    const RepaymentSummaryDetails = ({title,total,received,pending,partially}:RepaymentSummaryDetailsProps) =>{
        return(
            <>
            <div className="border-b-1 border-slate-600">
                <div className="px-2 flex justify-between">
                    <h1 className="font-bold text-white">{title}</h1>
                    <h1 className="font-bold text-white">{Number(total).toLocaleString("en-IN")}</h1>
                </div>
                <div className="px-2 flex justify-between pb-2">
                    <h3 className="text-xs text-white flex justify-center items-center gap-1"><IoCheckmarkDone size={10}/>Received ({received})</h3>
                    <h3 className="text-xs text-white flex justify-center items-center gap-1"><IoIosTimer size={10}/>Pending ({pending})</h3>
                    <h3 className="text-xs text-white flex justify-center items-center gap-1"><FaStarHalfAlt size={10}/> Partially ({partially})</h3>
                </div>
            </div>
            </>
        )
    }
    return(
        <>  
            <PageTitle pageName="Dashboard"/>
            <div className="p-2">
                <h1 className="font-bold text-white">Dashboard</h1>
                
                <div className="pt-2 px-1 grid grid-cols-6 gap-2">
                    
                    {/* Credit Card Summary */}
                    <div className="col-span-1">
                        <div className="bg-linear-to-b border-1 border-slate-800 from-indigo-900 to-indigo-950 p-2 rounded-xl overflow-hidden">
                            <h1 className="text-center text-white text-shadow-sm text-shadow-gray-800">Credit Card Summary</h1>
                            <h2 className="text-white text-center text-xl font-bold">₹ 2,000</h2>
                            <p className="text-white text-center text-xs italic">Total Amount Due</p>
                            <p className="text-white text-center text-xs">Total Cards ( 2 )</p>
                        </div>
                    </div>
                    {/* Credit Card Summary Ends*/}

                    {/* Repayment Summary */}
                    <div className="col-span-1">
                        <div className="bg-linear-to-b border-1 border-slate-800 from-indigo-900 to-indigo-950 rounded-xl overflow-hidden pb-2">
                            <h1 className="text-center text-white text-shadow-sm text-shadow-gray-800 bg-indigo-950 py-1">Repayment</h1>

                            {/* <h2 className="text-sm  text-white flex justify-center items-center gap-2">TM - 3 <GiNinjaStar size={6}/> Tdy - 3 <GiNinjaStar size={6}/> Tmr - 5</h2> */}
                            
                            {/* <p className="flex justify-between text-white">
                                <label>Today</label> <label>Rs.200</label>
                            </p> */}

                            <RepaymentSummaryDetails title="Today" total="5" received="5" pending="6" partially="7"/>
                            <RepaymentSummaryDetails title="Tomorrow" total="10" received="5" pending="6" partially="7"/>
                            <RepaymentSummaryDetails title="This Month" total="15" received="5" pending="6" partially="7"/>
                            <RepaymentSummaryDetails title="Last Month" total="20" received="5" pending="6" partially="7"/>
                            
                        </div>
                    </div>
                    {/* Repayment Summary Ends */}

                </div>

            </div>
        </>
    );
};

export default Dash;