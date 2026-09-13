import { LuRefreshCw } from "react-icons/lu";
import { FaDatabase,FaChartPie } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
// import { type } from './../../../../services/store';

type OverallSummaryProps = {
    loadingOverallSummary:boolean,
    overallSummaryList:any[],
    loadUserSummary:Function
};

const OverallSummary = ({loadingOverallSummary,overallSummaryList,loadUserSummary}:OverallSummaryProps) =>{

    type SKProps = {
        height:Number
    }
    const SK = ({height}:SKProps) =>{
        return(
                <Skeleton 
                    height={height} 
                    baseColor="#cfcfcf" 
                    highlightColor="#ffffff" 
                    count={1}
                    borderRadius={5}
                />
        );
    }  
    
    type PaymentCardProps = {
        title:String,
        count:Number,
        type:String,
        payments:any[],
        total_amount:Number,
        loadingOverallSummary:Boolean
    }
    const PaymentCard = ({ title, count, type,payments,total_amount,loadingOverallSummary}:PaymentCardProps) => {
        const isRepayment = type === "repayment";
        
        return (
            <div
                className={`
                    rounded-2xl border overflow-hidden
                    ${isRepayment
                        ? "border-amber-500/40 bg-gradient-to-br from-amber-950/30 to-slate-950"
                        : "border-blue-500/40 bg-gradient-to-br from-blue-950/30 to-slate-950"
                    }
                `}
            >
                {/* Header */}
                <div className="px-6 pt-5 pb-4">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                            {/* Icon */}
                            <div
                                className={`
                                    flex h-12 w-12 items-center justify-center
                                    rounded-full text-xl
                                    ${isRepayment
                                        ? "bg-amber-500/20 text-amber-400"
                                        : "bg-blue-500/20 text-blue-400"
                                    }
                                `}
                            >
                                {isRepayment ? <LuRefreshCw size={25}/> : <FaDatabase size={25}/>}
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    {title}

                                    {loadingOverallSummary?(
                                        <><span className="animate-pulse pl-1">(. .)</span></>
                                    ):(<>
                                        <span className="text-slate-400 pl-1">
                                            ({count})
                                        </span>
                                    </>)}
                                </h3>

                                <p className="mt-1 text-sm text-slate-400">
                                    Total Amount
                                    <span className="ml-2 font-semibold text-white">
                                        {loadingOverallSummary?(
                                            <><span className="animate-pulse">. . . .</span></>
                                        ):(
                                            <>₹{Number(total_amount).toLocaleString("en-IN")}</>
                                        )}
                                    </span>
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Table Header */}
                <div className="mx-5 border-y border-white/10"></div>

                {/* List */}
                <div className="px-5 pb-5 max-h-100 overflow-y-auto custom-overflow-track">
                    {loadingOverallSummary?(
                        <>
                            <SK height={30}/>
                            <SK height={30}/>
                            <SK height={30}/>
                        </>
                    ):(<>
                        
                    {payments.map((payment, index) => (

                        <div
                            key={payment.name}
                            onClick={()=>loadUserSummary(payment.id)}
                            
                            className="
                                cursor-pointer
                                grid grid-cols-[60px_1fr_140px]
                                items-center
                                border-b border-white/10
                                px-3 py-2
                                transition
                                hover:bg-white/[0.03]
                            "
                        >

                            {/* Rank */}
                            <div>
                                <span
                                    className={`
                                        flex h-9 w-9 items-center justify-center
                                        rounded-full text-sm font-bold
                                        ${index === 0
                                            ? "bg-amber-500/20 text-amber-300"
                                            : index === 1
                                            ? "bg-slate-400/20 text-slate-300"
                                            : "bg-orange-500/20 text-orange-300"
                                        }
                                    `}
                                >
                                    {index + 1}
                                </span>
                            </div>

                            {/* Name */}
                            <span className="font-medium text-slate-200">
                                {payment.name}
                            </span>

                            {/* Amount */}
                            <span className="text-right text-base font-semibold text-white">
                                ₹{Number(payment.amount).toLocaleString("en-IN")}
                            </span>

                        </div>

                    ))}

                    </>)}

                </div>
            </div>
        );
    };

    return(
        <>
            {/* <h1 className="text-white">User Base Summary</h1> */}
            <div className="grid grid-cols-2 gap-3">

                {/* {!loadingOverallSummary&&(<> */}
                    <PaymentCard
                        title="Repayment"
                        count={overallSummaryList?.repayment?.total}
                        total_amount={overallSummaryList?.repayment?.total_amount}

                        type="repayment"
                        payments={overallSummaryList?.repayment?.user_overview}
                        loadingOverallSummary={loadingOverallSummary}
                    />

                    <PaymentCard
                        title="EMI"
                        count={overallSummaryList?.emi?.total}
                        total_amount={overallSummaryList?.emi?.total_amount}
                        type="emi"
                        payments={overallSummaryList?.emi?.user_overview}
                        loadingOverallSummary={loadingOverallSummary}
                    />
                {/* </>)} */}
                

                
            </div>
        </>
    )
}

export default OverallSummary;