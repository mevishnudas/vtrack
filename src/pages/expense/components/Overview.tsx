import Skeleton from "react-loading-skeleton";
// import { GiPieChart } from "react-icons/gi";

type overviewProps = {
    overViewData:any[],
    overViewLoading:Boolean,
    overViewShowSkeleton:Boolean,
    toggleExpenseSummary:Function,
    selectedPeriod:String
};

const Overview = ({overViewData,overViewLoading,overViewShowSkeleton,toggleExpenseSummary,selectedPeriod}:overviewProps) =>{

    type PeriodBoxProps = {
        title:String,
        amount:Number,
        custom_class:String
    }
    const PeriodBox = ({title,amount,custom_class}:PeriodBoxProps) =>{
        return(
            <>
                <div className={`${custom_class} rounded py-1 border-1 border-gray-700 select-none`}>
                    <h1 className="text-white text-center font-bold">{title}</h1>
                    <h2 className="text-white text-center font-bold">₹ {Number(amount).toLocaleString("en-IN")}</h2>
                </div>
            </>
        )
    }

    const SkeletonLayout = () =>{
        return(
            <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
                <div className="col-span-1">
                    <Skeleton 
                        height={60} 
                        baseColor="#1d293d" 
                        highlightColor="#50678c" 
                        count={1}
                    />
                </div>
                <div className="col-span-1">
                    <Skeleton 
                        height={60} 
                        baseColor="#1d293d" 
                        highlightColor="#50678c" 
                        count={1}
                    />
                </div>
                <div className="col-span-1">
                    <Skeleton 
                        height={60} 
                        baseColor="#1d293d" 
                        highlightColor="#50678c" 
                        count={1}
                    />
                </div>
                <div className="col-span-1">
                    <Skeleton 
                        height={60} 
                        baseColor="#1d293d" 
                        highlightColor="#50678c" 
                        count={1}
                    />
                </div>
            </div>
        )
    }
    return(
        <>  
            {overViewLoading&&overViewShowSkeleton&&(<SkeletonLayout/>)}
            
            {!overViewShowSkeleton&&(<>
                <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
                    
                    <div className={`col-span-1 cursor-pointer `} onClick={()=>toggleExpenseSummary({period:"this_year"})}>
                        <PeriodBox title="This Year" amount={overViewData?.this_year} custom_class={`bg-gradient-to-b from-slate-700 to-slate-800 ${selectedPeriod=="this_year"&&(`border-1 border-b-yellow-600 rounded`)}`}/>
                    </div>
                    <div className="col-span-1 cursor-pointer" onClick={()=>toggleExpenseSummary({period:"last_month"})}>
                        <PeriodBox title="Last Month" amount={overViewData?.last_month} custom_class={`bg-gradient-to-b from-slate-700 to-slate-800 ${selectedPeriod=="last_month"&&(`border-1 border-b-yellow-600 rounded`)}`}/>
                    </div>

                    <div className="col-span-1 cursor-pointer" onClick={()=>toggleExpenseSummary({period:"this_month"})}>
                        <PeriodBox title="This Month" amount={overViewData?.this_month} custom_class={`bg-gradient-to-b from-slate-700 to-slate-800 ${selectedPeriod=="this_month"&&(`border-1 border-b-yellow-600 rounded`)}`}/>
                    </div>
                
                    <div className="col-span-1 cursor-pointer" onClick={()=>toggleExpenseSummary({period:"today"})}>
                        <PeriodBox title="Today" amount={overViewData?.today} custom_class={`bg-gradient-to-b from-slate-700 to-slate-800 ${selectedPeriod=="today"&&(`border-1 border-b-yellow-600 rounded`)}`}/>
                    </div>

                </div>
                
                {/* <div className="pt-1">
                    <p className="text-blue-300 text-xs text-end flex justify-end gap-1 items-center cursor-pointer">
                        <GiPieChart size={18} /> View Summary
                    </p>
                </div> */}
            </>)}
        </>
    )
}
export default Overview;