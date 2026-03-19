
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import PaymentHistoryList from "./PaymentHistoryCard";
import { FiPlusSquare } from "react-icons/fi";
import AddPaymentInfo from "./AddPaymentInfo";

type CreditCardDetailProps = {
    selectedCreditCard:number,
    setSelectedCreditCard:Function,
    creditCardDetail:any[],
    creditCardInfoLoading:boolean,
    creditCardPaymentHistory:any[]
}

const CreditCardDetail = ({selectedCreditCard,setSelectedCreditCard,creditCardDetail,creditCardInfoLoading,creditCardPaymentHistory}:CreditCardDetailProps) =>{
    const [addPayment,setAddPayment] = useState(false);
    const [paymentFormShow,setPaymentFormShow] = useState(false);

    useEffect(()=>{

        return ()=>{
            setAddPayment(false);
        }

    },[selectedCreditCard]);

    return(
        <>
            <div className="bg-slate-900 rounded-sm border-1 border-slate-700">

                {creditCardInfoLoading?( 
                    <div className="text-white p-2 flex justify-center items-center gap-2 h-40">
                        <CgSpinnerTwoAlt size={20} className="animate-spin"/>
                        <p className="text-sm text-gray-300">Gathering data...</p>
                    </div>
                 ):(
                    <div className="py-2 px-2">

                        <div className="grid grid-cols-3">
                            <div className="col-span-2">
                                <h1 className="text-white font-bold px-2">{creditCardDetail.name} - <span className="text-xs">{creditCardDetail.variant_name}</span></h1>
                            </div>
                            <div className="col-span-1 flex justify-end text-white">
                                <IoIosClose className="cursor-pointer" onClick={()=>setSelectedCreditCard(0)}/>
                            </div>

                            <div className="col-span-3"><h1 className="text-white px-2 text-sm">**** {creditCardDetail.last_digit}</h1></div>
                        </div>


                        
                        {!addPayment&&(
                            <>
                            <div className="pt-2 pb-1">
                                <div className="bg-linear-to-r from-cyan-500 to-blue-500 rounded-sm px-2 py-1">

                                    <h1 className="uppercase text-white text-shadow-2xs font-bold px-1">Current Bill</h1>
                                    {creditCardPaymentHistory[0]?.amount?(
                                        <h1 className="uppercase text-white text-shadow-2xs font-bold px-1">₹{Number(creditCardPaymentHistory[0]?.amount).toLocaleString("en-IN")}</h1>
                                    ):(
                                        <h1 className="uppercase text-white text-shadow-2xs font-bold px-1">Nill</h1>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end items-end">
                                <button title="Add Bill" 
                                    className="cursor-pointer text-sm text-white"
                                    onClick={()=>setAddPayment(true)} 
                                    >
                                    <FiPlusSquare size={15}/>
                                </button>
                            </div>
                            </>
                        )}

                        {addPayment&&(
                            <>
                            <div className="pt-5 pb-2 border-b-1 border-b-slate-800">
                                <AddPaymentInfo 
                                    creditCardId={creditCardDetail.id}
                                    setAddPayment={setAddPayment}
                                />
                            </div>
                            </>
                        )}
                      

                        <div className="pt-2">

                            <h1 className="text-white text-sm pb-2">Payment history</h1>

                            {creditCardPaymentHistory.length==0&&(<>
                                <p className="text-center text-sm text-gray-500">No records found</p>
                            </>)}

                            <div className="grid grid-cols-1 pr-1 rounded-sm max-h-80 overflow-x-auto custom-overflow-track">

                                <div className="col-span-1 border-b-1 border-b-slate-800">
                                
                                    {creditCardPaymentHistory.map((row)=>(
                                        <PaymentHistoryList key={row.id} info={row}/>
                                    ))}

                                </div>
                            </div>

                        </div>


                    </div>
                )}
                </div>
        </>
    );

}

export default CreditCardDetail;