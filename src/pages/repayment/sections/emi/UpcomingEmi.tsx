import {format} from "date-fns";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import {Month} from "../../../../utils/Month";
import { FaFilter } from "react-icons/fa";

type UpcomingEmiProps = {
    upcomingPayment:any[],
    emiList:any[],
    setSelectedEmi:Function,
    upcomingPaymentLoading:boolean,
    loadUpcomingPayments:Function,

    selectedMonth:Number,
    setSelectedMonth:Function,

    selectedYear:Number,
    setSelectedYear:Function,
    yearList:any[]
}
const UpcomingEmi = ({
        upcomingPayment, 
        emiList, 
        setSelectedEmi, 
        upcomingPaymentLoading,
        loadUpcomingPayments,
        selectedMonth,
        setSelectedMonth,
        
        selectedYear,
        setSelectedYear,
        yearList
    }:UpcomingEmiProps) =>{

    type CardProps = {
        payee:String,
        emi_amount:Number,
        duration:Number,
        paid:Number,
        emi_remarks:String,
        emi_payment_due_date:Date,
        emi_payment_status:String,
        bank_name:String,
        emi_id:Number
    }
    const Card = ({payee,emi_amount,duration,paid,emi_remarks,emi_payment_due_date,emi_payment_status,bank_name,emi_id}:CardProps) =>{
        return(
            <>
            {/* <div className="bg-gradient-to-b from-[#57e4e4] to-[#40d8d8] py-2 px-3 rounded-sm min-h-20"> */}
            {/* <div onClick={()=>showEMIdetails(emi_id)} className="bg-gradient-to-b from-[#fde394] to-[#f8dd8b] py-2 px-3 rounded-sm min-h-20 cursor-pointer"> */}
            <div onClick={()=>showEMIdetails(emi_id)} className="bg-gradient-to-b from-[#04050c] to-[#05060f] py-2 px-3 border-b-1 border-dotted border-b-gray-600 rounded-sm min-h-20 cursor-pointer">
                <div className="flex justify-between">
                    <h1 className="font-bold text-white">{payee}</h1>

                    {emi_payment_status=="NOT_GENERATED"&&(
                        <h1 className="font-bold text-black text-blue-500 text-sm">[ Awaiting Generation ]</h1>
                    )}

                    {emi_payment_status=="PAID"&&(
                        <h1 className="font-bold text-black text-green-500 text-sm">[ Received ]</h1>
                    )}

                    {emi_payment_status=="PENDING"&&(
                        <h1 className="font-bold text-black text-red-500 text-sm">[ Pending ]</h1>
                    )}
                </div>  

                <div>
                    <p className="text-white">EMI({paid}/{duration}) : <label className="font-bold">{Number(emi_amount).toLocaleString("en-IN")}</label></p>
                </div> 

                <div className="text-white pt-2">
                    <p>Payment Date : <label className="font-bold">{format(new Date(emi_payment_due_date),"MMM dd")}</label></p>
                    <p>From : <label className="font-bold">{bank_name}</label></p>
                    {emi_remarks&&(
                        <p>Remarks : <label className="italic">{emi_remarks}</label></p>
                    )}
                </div>

            </div>
            </>
        );
    }

    const showEMIdetails = (emi_id:Number) =>{
        
        const item = emiList.find(row => row.id === emi_id);
        if(item)
        { setSelectedEmi(item);}

        return true;
    }
    return(
        <>   
            <div className="flex justify-between border-b-1 border-b-gray-700 pb-1">
                <h1 className="font-bold flex justify-start items-center gap-2">
                    Upcoming Payments {upcomingPaymentLoading&&(<CgSpinnerTwoAlt size={20} className="animate-spin"/>)}
                </h1>

                <div className="flex">
                    <div className="pr-2">
                            <select 
                                value={selectedYear}  
                                onChange={(e)=>setSelectedYear(e.target.value)}
                                className="w-full border-1 border-gray-700 rounded-sm py-1 px-1 outline-none bg-gray-800 text-white">
                                {yearList.map((row,index)=>(
                                    <option value={row} key={index}>{row}</option>
                                ))}
                            </select>
                    </div>

                    <div className="pr-2">
                        <select value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)} className="w-full border-1 border-gray-700 rounded-sm py-1 px-1 outline-none bg-gray-800 text-white">
                                {Month.map(row=>(
                                    <option key={row.id} value={row.id}>{row.name}</option>
                                ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button disabled={upcomingPaymentLoading} className="bg-blue-700 active:bg-blue-900 disabled:bg-blue-900 text-amber-50 px-2 py-1 rounded-sm" onClick={loadUpcomingPayments}><FaFilter size={15}/></button>
                    </div>
                </div>

            </div>
            {!upcomingPaymentLoading&&upcomingPayment.length==0&&(<p className="text-center text-gray-400 text-sm">No Data.</p>)}
            
            <div className="pt-2 grid grid-cols-1 gap-3 max-h-180 overflow-y-auto custom-overflow-track pr-1">
                {upcomingPayment.map((item, index) => (
                    <Card 
                          key={index} 
                          payee={item.name}
                          emi_amount={item.emi_amount}

                          duration={item.duration}
                          paid={item.paid}
                          emi_remarks={item.emi_remarks}
                          emi_payment_due_date={item.emi_payment_due_date}
                          emi_payment_status={item.emi_payment_status}
                          
                          emi_id={item.id}
                          bank_name={item.bank_name}
                    />
                ))}
            </div>
        </>
    );
};

export default UpcomingEmi;