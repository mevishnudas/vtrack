import { format } from "date-fns";
type param = {
    listData:any,
    className?:string
};

const EmiDetailCard = ({listData,className}:param) =>{
    // console.log(listData);

    const emiStatus = (emi_status:string) =>{
        
        let label = "Open";
        let color = "text-red-700";

        switch (emi_status) {
            case "OPEN":
                label = "Open";
                color = "text-red-700";
                break;

            case "CLOSED":
                label = "Closed";
                color = "text-green-700";
                break;

            case "PRE_CLOSED":
                label = "Pre closed";
                color = "text-blue-700";
            break;

            default:
                label = "Open";
                break;
        }

        return(<><label className={`font-bold text-right ${color}`}>[ {label} ]</label></>)
    }

    return(
        <>
            <div className={`cursor-pointer bg-gradient-to-b from-[#fff2cc] to-[#fceab4] rounded-sm border-1 border-gray-300 text-black ${className}`}>

                <div className="py-2 px-2">
                    <div className="grid grid-cols-2">
                        <label className="font-bold text-black">{listData.payee}</label>
                        {emiStatus(listData.status)}
                    </div>
                    
                    <p>Amount : <span className="font-bold">{listData.amount.toLocaleString("en-IN")}</span></p>
                    <p>EMI({listData.duration}) : {listData.emi.toLocaleString("en-IN")}</p>
                    <p>Pr.Fee : {listData.pr_fee.toLocaleString("en-IN")}</p>
                    <p>Paid : <span className="font-bold">0</span></p>

                    <br/>
                    <p>Payment Date : <span className="font-bold">{format(new Date(listData.payment_date), "MMM dd")}</span></p>
                    <p>Distributed Date : <span className="font-bold">{format(new Date(listData.distributed_date), "dd MM yyyy")}</span></p>
                    <p>From : <span className="font-bold">{listData.source}</span></p>
                        {listData.remarks&&(
                            <p>Remarks : <span className="italic">{listData.remarks}</span></p>
                        )}
                </div>

            </div>
        </>
    );
};

export {EmiDetailCard};