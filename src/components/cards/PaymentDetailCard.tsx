import { format } from "date-fns";
import { IoIosCopy } from "react-icons/io";
import {copyToClipBoard} from "../../utils/copyToClipBoard";

type param = {
    listData:any,
    className:string
};

const PaymentDetailCard = ({listData,className}:param) =>{
    // console.log(listData);

    const paymentStatus = (payment_status:string) =>{
        
        let label = "Pending";
        let color = "text-red-700";

        switch (payment_status) {
            case "RECEIVED":
                label = "Received";
                color = "text-green-700";
                break;

            case "PARTIALLY_PAID":
                label = "Partially Paid";
                color = "text-blue-700";
                break;

            default:
                label = "Pending";
                break;
        }

        return(<><label className={`font-bold text-right ${color}`}>[ {label} ]</label></>)
    }

    const copyNow = async (e:any) =>{
        e.stopPropagation();  

        await copyToClipBoard({
            message:`*${listData.payee}*\nAmount : ${listData.amount.toLocaleString("en-IN")}\nPr.Fee : ${listData.pr_fee.toLocaleString("en-IN")}\nCharges : ${listData.charges.toLocaleString("en-IN")}\n\nTotal : *Rs.${listData.total.toLocaleString("en-IN")}*\nPayment Date : *${format(new Date(listData.payment_date), "MMM dd-yyyy")}*`
        });
    }

    return(
        <>
            <div className={`bg-gradient-to-b from-[#fff2cc] to-[#fceab4] rounded-sm border-1 border-gray-300 ${className}`}>

                <div className="p-2">
                    <div className="grid grid-cols-2">
                        <label className="font-bold">{listData.payee}</label>
                        {paymentStatus(listData.payment_status)}
                    </div>
                    <p>Amount : <span className="font-bold">{listData.amount.toLocaleString("en-IN")}</span></p>
                    <p>Pr.Fee : {listData.pr_fee.toLocaleString("en-IN")}</p>
                    <p>Charges : {listData.charges.toLocaleString("en-IN")}</p>
                    <br/>
                    <p>Total : <span className="font-bold">Rs.{listData.total.toLocaleString("en-IN")}</span></p>
                    <p>Payment Date : <span className="font-bold">{format(new Date(listData.payment_date), "MMM dd")}</span></p>
                    <p>From : <span className="font-bold">{listData.from}</span></p>
                    {listData.remarks&&(
                        <p>Remarks : <span className="italic">{listData.remarks}</span></p>
                    )}

                    <div className="relative">
                        <div className="absolute right-0 -bottom-0.5">
                            <button className="text-black cursor-pointer" onClick={copyNow}>
                                <IoIosCopy/>
                            </button>
                        </div>
                    </div>
                    
                </div>

            </div>
        </>
    );
};

export default PaymentDetailCard;