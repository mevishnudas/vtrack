import { formatDate } from "date-fns";

type PaymentHistoryListProps = {
    info:any[]
};

const PaymentHistoryList = ({info}:PaymentHistoryListProps) =>{

    type PaymentStatusProps = {
        status:string
    };

    const PaymentStatus = ({status}:PaymentStatusProps) =>{

        switch (status) {
            case "PAID_VERIFIED":
                return(
                    <label className="text-sm text-green-400">Paid & Verified</label>
                );
                break;

            case "PAID":
                return(
                    <label className="text-sm text-blue-400">Paid</label>
                );
            break;
            
            default:
                //PENDING
                return(
                    <label className="text-sm text-red-400">Pending</label>
                );
                break;
        }

    }

    return(<>
        <div className="grid grid-cols-2 border-b-1 border-b-gray-600 py-1 px-1">
            <div>
                <div><label className="text-white text-xs uppercase">{formatDate(new Date(info.payment_date),"dd MMM")}</label></div>
                <div><label className="text-white font-bold">₹{Number(info.amount).toLocaleString("en-IN")}</label></div>
            </div>
            <div className="flex justify-end items-center">
                <PaymentStatus status={info.payment_status}/>
            </div>
        </div>
    </>);
}

export default PaymentHistoryList;