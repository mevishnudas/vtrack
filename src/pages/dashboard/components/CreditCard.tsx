type CreditCardProps = {
    creditCardSummary:any[],
    loading:boolean
}

const CreditCard = ({creditCardSummary,loading}:CreditCardProps) =>{
    return(
        <div className="bg-linear-to-b border-1 border-slate-800 from-indigo-900 to-indigo-950 p-2 rounded-xl overflow-hidden">
            <h1 className="text-center text-white text-shadow-sm text-shadow-gray-800">Credit Card Summary</h1>
            
            {loading?(<>
                <div className="grid gap-1 animate-pulse pt-2 justify-items-center text-center">
                    <h2 className="text-xl font-bold p-2 bg-indigo-400 rounded-2xl w-50"></h2>
                    <p className="text-white text-center p-2 bg-indigo-400 rounded-2xl w-30"></p>
                    <p className="text-white text-center p-2 bg-indigo-400 rounded-2xl w-20"></p>
                </div>
            </>):(<>
                <h2 className="text-white text-center text-xl font-bold">₹ {Number(creditCardSummary?.total_amount_due).toLocaleString("en-IN")}</h2>
                <p className="text-white text-center text-xs italic">Total Amount Due</p>
                <p className="text-white text-center text-xs">Total Cards ( {creditCardSummary?.total_cards} )</p>
            </>)}
            
        </div>
    );
}
export default CreditCard;