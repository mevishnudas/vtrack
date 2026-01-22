import { format } from "date-fns";

type TransactionProps = {
    info:any[]
};
const Transaction = ({info}:TransactionProps) =>{
    return(
        <div className="grid grid-cols-2 py-2 border-b-1 border-b-gray-800 px-2 mb-1">
            <div>
                <p className="text-xs text-gray-400">{format(new Date(info.date), "dd-MMM-yyyy")} | {format(new Date(info.date), "hh:mm a")}</p>
            </div>
            
            <div>
                {info.payment_type=="PAID"?(
                    <p className="text-end text-xs text-gray-400 text-red-300">You paid</p>
                ):(
                    <p className="text-end text-xs text-gray-400 text-green-300">You received</p>
                )}
                
            </div>

            <div>
                <p className="text-sm text-gray-200">{info.remarks}</p>
            </div>
            <div>
                <h2 className="text-end font-bold text-gray-200">₹ {info.amount.toLocaleString("en-IN")}</h2>
            </div>
        </div>
    );
};

export default Transaction;