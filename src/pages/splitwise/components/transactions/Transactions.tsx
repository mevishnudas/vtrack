import { format } from "date-fns";

type TransactionProps = {
    info:any[],
    selectedFriend:any[]
};
const Transaction = ({info,selectedFriend}:TransactionProps) =>{
    return(<>
        {info.payment_mode=="SETTLE_UP"?(
            <>
              <div className={`py-1 px-1 border-b-1 border-b-gray-800 bg-green-950 text-white mb-1`}>
                
                <div>
                    <p className="text-xs text-gray-400 pb-1">{format(new Date(info.date), "dd-MMM-yyyy")} | {format(new Date(info.date), "hh:mm a")}</p>
                </div>

                {info.payment_type=="PAID"?(
                    <p className="text-sm text-center "><span className="font-bold">₹{Number(info.amount).toLocaleString("en-IN")}</span> paid to {selectedFriend.name}</p>
                ):(
                    <p className="text-sm text-center "><span className="font-bold">₹{Number(info.amount).toLocaleString("en-IN")}</span> received from {selectedFriend.name}</p>
                )}

                <p className="text-xs text-center">{info.remarks}</p>
              </div>
            </>
        ):(
        
        <div className={`grid grid-cols-2 py-2 border-b-1 border-b-gray-800 px-2 mb-1`}>
            
            <div>
                <p className="text-xs text-gray-400">{format(new Date(info.date), "dd-MMM-yyyy")} | {format(new Date(info.date), "hh:mm a")}</p>
            </div>
            
            <div>
                {info.payment_type=="PAID"?(
                    <p className="text-end text-xs text-gray-400 text-green-300">You lent</p>
                ):(
                    <p className="text-end text-xs text-gray-400 text-red-300">You borrowed</p>
                )}
                {/* need paid you */}
            </div>

            <div>
                <p className="text-sm text-gray-200">{info.remarks}</p>
            </div>
            <div>
                <h2 className="text-end font-bold text-gray-200">₹ {Number(info.amount).toLocaleString("en-IN")}</h2>
            </div>
            
        </div>

        )}
    </>);
};

export default Transaction;