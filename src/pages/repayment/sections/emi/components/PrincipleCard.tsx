import {format} from "date-fns";
import { IoIosCopy } from "react-icons/io";
import {copyToClipBoard} from "../../../../../utils/copyToClipBoard";

type PrincipleCardProps = {
    index:number,
    payee:string,
    duration:number,
    data:any[]
};

const PrincipleCard = ({index,duration,data,payee,...rest}:PrincipleCardProps) =>{

    const copyNow = async (e:any) =>{
        e.stopPropagation();  

        await copyToClipBoard({
            message:`*${payee}*\nEMI(${data?.principle}/${duration}) : *Rs.${data?.amount.toLocaleString("en-IN")}*\nPayment Date : *${format(new Date(data?.payment_date), "MMM dd-yyyy")}*`
        });
    }

        return(
            <div {...rest} className={` rounded-sm text-black cursor-pointer px-2 py-2 ${data?.payment_status==="PAID"?"bg-green-100":"bg-red-100"}`}>

                <div className="grid grid-cols-3">
                    <div>
                        <label><span className="font-bold text-sm">({index})</span> Principle</label>
                        <p><span className="text-sm">EMI ({data?.principle}/{duration})</span> : <span className="font-bold">Rs.{data?.amount.toLocaleString("en-IN")}</span></p>
                    </div>

                    <div>
                        <label>Payment Date</label>
                        <p className="font-bold text-sm">{format(new Date(data?.payment_date),"MMM dd yyyy")}</p>
                    </div>
                    
                    <div>
                        <label>Payment Status</label>
                        <p className="font-bold text-sm">{data?.payment_status=="PAID"?"Paid":"Pending"}</p>
                    </div>
                </div>

                {data?.remarks&&(
                    <div>
                        <label className="text-sm font-bold">Remarks</label>
                        <p className="italic text-sm">{data?.remarks}</p>
                    </div>
                )}

                <div className="relative">
                    <div className="absolute right-0 -bottom-0.5">
                        <button className="text-black" onClick={copyNow}>
                            <IoIosCopy/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

export default PrincipleCard;