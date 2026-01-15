type OverviewBalanceProps ={
    total_balance:number|0,
    ows_you:number|0,
    you_ows:number|0
}

const OverviewBalance = ({total_balance,ows_you,you_ows}:OverviewBalanceProps) =>{
    return(
        <div className="grid grid-cols-3 pt-2 gap-4 border-b-1 border-b-gray-600 pb-2">
            <div className="border-r-1 border-r-gray-600">
                <h1 className="text-center">total balance</h1>

                {total_balance<0?(
                    <h2 className="text-center text-red-400">Rs.{total_balance.toLocaleString("en-IN")}</h2>
                ):(
                    <h2 className="text-center text-green-400">Rs.{total_balance.toLocaleString("en-IN")}</h2>
                )}
                
            </div>

            <div className="border-r-1 border-r-gray-600">
                <h1 className="text-center">you owe</h1>
                <h2 className="text-center text-red-400">Rs.{you_ows.toLocaleString("en-IN")}</h2>
            </div>
            
            <div className="">
                <h1 className="text-center">you are owed</h1>
                <h2 className="text-center text-green-400">Rs.{ows_you.toLocaleString("en-IN")}</h2>
            </div>
        </div>
    );
};

export default OverviewBalance;