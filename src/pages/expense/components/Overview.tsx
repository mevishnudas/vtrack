import Skeleton from "react-loading-skeleton";

type overviewProps = {
    overViewData:any[],
    overViewLoading:Boolean,
    overViewShowSkeleton:Boolean
};

const Overview = ({overViewData,overViewLoading,overViewShowSkeleton}:overviewProps) =>{

    type PeriodBoxProps = {
        title:String,
        amount:Number,
        bg_color:String
    }
    const PeriodBox = ({title,amount,bg_color}:PeriodBoxProps) =>{
        return(
            <>
                <div className={`${bg_color} rounded py-1 border-1 border-gray-700 `}>
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
                    
                    <div className="col-span-1">
                        <PeriodBox title="This Year" amount={overViewData?.this_year} bg_color={`bg-gradient-to-b from-slate-700 to-slate-800`}/>
                    </div>
                    <div className="col-span-1">
                        <PeriodBox title="Last Month" amount={overViewData?.last_month} bg_color={`bg-gradient-to-b from-slate-700 to-slate-800`}/>
                    </div>

                    <div className="col-span-1">
                        <PeriodBox title="This Month" amount={overViewData?.this_month} bg_color={`bg-gradient-to-b from-slate-700 to-slate-800`}/>
                    </div>
                
                    <div className="col-span-1">
                        <PeriodBox title="Today" amount={overViewData?.today} bg_color={`bg-gradient-to-b from-slate-700 to-slate-800`}/>
                    </div>

                </div>
            </>)}
        </>
    )
}
export default Overview;