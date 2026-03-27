import { IoCheckmarkDone } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SiMoneygram } from "react-icons/si";

type RepaymentProps = {
    repaymentSummary:any[],
    loading:boolean
}
const Repayment = ({repaymentSummary,loading}:RepaymentProps) =>{

    type RepaymentSummaryDetailsProps ={
        title:string,
        total:Number,
        received:Number,
        pending:Number,
        partially:Number,
        bottom_line:boolean
    }
    
    const RepaymentSummaryDetails = ({title,total,received,pending,partially,bottom_line=true}:RepaymentSummaryDetailsProps) =>{
        return(
            <>
            <div className={`${bottom_line?'border-b-1':'border-b-0'} border-slate-600`}>
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

    const SK = () =>{
        return(
            <div className="px-2 pt-1">
                <Skeleton 
                    height={40} 
                    baseColor="#74d4ff" 
                    highlightColor="#ffffff" 
                    count={4}
                />
            </div>
        );
    }
    return(
        <div className="bg-linear-to-b border-1 border-slate-800 from-sky-900 to-sky-950 rounded-xl overflow-hidden pb-2">
            <h1 className="text-center text-white text-shadow-sm text-shadow-gray-800 bg-sky-950 py-1 flex justify-center items-center gap-2"><SiMoneygram /> Repayment</h1>
            
            
            {loading?(<SK/>):(<>
                    <RepaymentSummaryDetails title="Today" total={repaymentSummary?.today?.total} received={repaymentSummary?.today?.received} pending={repaymentSummary?.today?.pending} partially={repaymentSummary?.today?.partially}/>
                    <RepaymentSummaryDetails title="Tomorrow" total={repaymentSummary?.tomorrow?.total} received={repaymentSummary?.tomorrow?.received} pending={repaymentSummary?.tomorrow?.pending} partially={repaymentSummary?.tomorrow?.partially}/>
                    <RepaymentSummaryDetails title="This Month" total={repaymentSummary?.this_month?.total} received={repaymentSummary?.this_month?.received} pending={repaymentSummary?.this_month?.pending} partially={repaymentSummary?.this_month?.partially}/>
                    <RepaymentSummaryDetails title="Last Month" total={repaymentSummary?.last_month?.total} received={repaymentSummary?.last_month?.received} pending={repaymentSummary?.last_month?.pending} partially={repaymentSummary?.last_month?.partially} bottom_line={false}/> 
                </>
            )}
        </div>
    )
};

export default Repayment;