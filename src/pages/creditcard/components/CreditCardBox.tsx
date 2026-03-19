
import { compareAsc, format } from "date-fns";

type CreditCardBoxProps = {
    info:any[]
};

const CreditCardBox = ({info,...rest}:CreditCardBoxProps) =>{

    
    return(
        <>
        <div {...rest} className={`cursor-pointer rounded-sm grid border-1 bg-linear-to-b from-slate-900 to-slate-950 border-slate-700 overflow-hidden`}>

                <div className="py-1 px-2">
                    <h1 className="text-white flex justify-between">{info.name} <span className="text-xs text-white">{info.variant_name}</span></h1>
                    
                    <h1 className="text-white">**** **** **** {info.last_digit} </h1>
                </div>

                <div className="py-1 px-2 grid grid-cols-2 pt-2">
                    <div className="col-span-1 text-sm">
                        <h1 className="text-xs text-white">Bill Amount</h1>
                        <h1 className="text-white">₹ {info.amount||0}</h1>
                    </div>

                    <div className="col-span-1 text-sm">
                        <h1 className="text-xs text-white">Due Date</h1>
                        <h1 className="text-white">{info.payment_date?format(new Date(info.payment_date), "dd-MMM-yyyy"):"Nill"}</h1>
                    </div>
                </div>
                
                {info.payment_status==null&&(
                    <div className="bg-blue-900 text-center text-sm text-white text-shadow-2xs">No Info</div>
                )}

                {info.payment_status=="PENDING"&&(
                    <div className="bg-red-800 text-center text-sm text-white text-shadow-2xs">Payment Due</div>
                )}
                
                {info.payment_status=="PAID"&&(
                    <div className="bg-green-800 text-center text-sm text-white text-shadow-2xs">PAID</div>
                )}
        </div>
        </>
    );
};

export default CreditCardBox;

