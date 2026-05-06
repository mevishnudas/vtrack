const Overview = () =>{

    type PeriodBoxProps = {
        title:String,
        amount:Number,
        bg_color:String
    }
    const PeriodBox = ({title,amount,bg_color}:PeriodBoxProps) =>{
        return(
            <>
                <div className={`${bg_color} rounded py-1 border-1 border-gray-900`}>
                    <h1 className="text-white text-center font-bold">{title}</h1>
                    <h2 className="text-white text-center font-bold">₹ {Number(amount).toLocaleString("en-IN")}</h2>
                </div>
            </>
        )
    }

    return(
        <>  
            <div className="grid grid-cols-4 gap-2">

                <div className="col-span-1">
                    <PeriodBox title="This Year" amount={25000} bg_color={`bg-gradient-to-b from-red-800 to-red-900`}/>
                </div>
                <div className="col-span-1">
                    <PeriodBox title="Last Month" amount={5000} bg_color={`bg-gradient-to-b from-yellow-800 to-yellow-900`}/>
                </div>

                <div className="col-span-1">
                    <PeriodBox title="This Month" amount={10000} bg_color={`bg-gradient-to-b from-cyan-800 to-cyan-900`}/>
                </div>
            
                <div className="col-span-1">
                    <PeriodBox title="Today" amount={1000} bg_color={`bg-gradient-to-b from-green-700 to-green-800`}/>
                </div>

            </div>
        </>
    )
}
export default Overview;