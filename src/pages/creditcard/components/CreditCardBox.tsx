
import { compareAsc, format } from "date-fns";
import { MdOutlinePendingActions,MdFileDownloadDone } from "react-icons/md";
import { IoTimerOutline,IoCheckmarkDone } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { FaHourglassHalf } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { MdDone } from "react-icons/md";


type CreditCardBoxProps = {
    info:any[]
};

const CreditCardBox = ({info,...rest}:CreditCardBoxProps) =>{

    type PaymentStatusProps = {
        status:string
    }

    type StatusLabelProps = {
        bg_color:any,
        icon:any,
        label:any
    }
    const StatusLabel = ({bg_color,icon,label}:StatusLabelProps)=>{
        return(
            <div className={`${bg_color} py-1 text-center text-sm text-white text-shadow-2xs flex justify-center items-center gap-2`}>{icon} {label}</div>
        );
    }
    const PaymentStatus = ({status}:PaymentStatusProps) =>{

        switch (status) {
            
            case 'PAID_VERIFIED':
                return <StatusLabel bg_color="bg-green-800" icon={<IoCheckmarkDone size={18}/>} label={"Paid & Verified"}/>;
                break;

            case 'PAID':
                return <StatusLabel bg_color="bg-cyan-800" icon={<MdFileDownloadDone size={18}/>} label={"Paid"}/>;
                break;

            case 'PARTIALLY_PAID':
                return <StatusLabel bg_color="bg-orange-800" icon={<FaStarHalfStroke size={18}/>} label={"Partially Paid"}/>;
                break;

            case 'PENDING':
                return <StatusLabel bg_color="bg-red-800" icon={<IoTimerOutline size={18}/>} label={"Payment Due"}/>;
                break;
            
            default:
                return <StatusLabel bg_color="bg-blue-900" icon={<CiCircleQuestion size={18}/>} label={"Not Updated"}/>;
                break;
        }
    }

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
                        <h1 className="text-white">₹ {info.amount?Number(info.amount).toLocaleString("en-IN"):0}</h1>
                    </div>

                    <div className="col-span-1 text-sm">
                        <h1 className="text-xs text-white">Due Date</h1>
                        <h1 className="text-white">{info.payment_date?format(new Date(info.payment_date), "dd-MMM-yyyy"):"Nill"}</h1>
                    </div>
                </div>
                
                <PaymentStatus status={info.payment_status}/>
                
        </div>
        </>
    );
};

export default CreditCardBox;

