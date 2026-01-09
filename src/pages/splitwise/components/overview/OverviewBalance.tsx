type OverviewBalanceProps ={
    total_balance:number|0,
    you_owe:number|0,
    you_are_owe:number|0
}

const OverviewBalance = ({total_balance,you_owe,you_are_owe}:OverviewBalanceProps) =>{
    return(
        <div className="grid grid-cols-3 pt-2 gap-4 border-b-1 border-b-gray-600 pb-2">
            <div className="border-r-1 border-r-gray-600">
                <h1 className="text-center">total balance</h1>
                <h2 className="text-center text-green-400">Rs.{total_balance.toLocaleString("en-IN")}</h2>
            </div>

            <div className="border-r-1 border-r-gray-600">
                <h1 className="text-center">you owe</h1>
                <h2 className="text-center text-red-400">Rs.{you_owe.toLocaleString("en-IN")}</h2>
            </div>
            
            <div className="">
                <h1 className="text-center">you are owed</h1>
                <h2 className="text-center text-green-400">Rs.{you_are_owe.toLocaleString("en-IN")}</h2>
            </div>
        </div>
    );
};

export default OverviewBalance;