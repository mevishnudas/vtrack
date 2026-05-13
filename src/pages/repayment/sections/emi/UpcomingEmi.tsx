import {format} from "date-fns";

type UpcomingEmiProps = {
    upcomingPayment:any[]
}
const UpcomingEmi = ({upcomingPayment}:UpcomingEmiProps) =>{

    type CardProps = {
        payee:String,
        emi_amount:Number,
        duration:Number,
        paid:Number,
        emi_remarks:String,
        emi_payment_due_date:Date,
        emi_payment_status:String,
        bank_name:String
    }
    const Card = ({payee,emi_amount,duration,paid,emi_remarks,emi_payment_due_date,emi_payment_status,bank_name}:CardProps) =>{
        return(
            <>
            {/* <div className="bg-gradient-to-b from-[#57e4e4] to-[#40d8d8] py-2 px-3 rounded-sm min-h-20"> */}
            <div className="bg-gradient-to-b from-[#fadb80] to-[#f8d66e] py-2 px-3 rounded-sm min-h-20">
                <div className="flex justify-between">
                    <h1 className="font-bold text-black">{payee}</h1>

                    {emi_payment_status=="NOT_GENERATED"&&(
                        <h1 className="font-bold text-black text-blue-700 text-sm">[ Awaiting Generation ]</h1>
                    )}

                    {emi_payment_status=="PAID"&&(
                        <h1 className="font-bold text-black text-green-700 text-sm">[ Received ]</h1>
                    )}

                    {emi_payment_status=="PENDING"&&(
                        <h1 className="font-bold text-black text-red-600 text-sm">[ Pending ]</h1>
                    )}
                </div>  

                <div>
                    <p className="text-black">EMI({paid}/{duration}) : <label className="font-bold">{Number(emi_amount).toLocaleString("en-IN")}</label></p>
                </div> 

                <div className="text-black pt-2">
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

    return(
        <>
            <h1 className="font-bold">Upcoming Payment</h1>
            <div className="pt-2 grid grid-cols-1 gap-3 max-h-150 overflow-y-auto custom-overflow-track pr-1">
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

                          bank_name={item.bank_name}
                    />
                ))}
            </div>
        </>
    );
};

export default UpcomingEmi;