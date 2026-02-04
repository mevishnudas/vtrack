
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";

type CreditCardDetailProps = {
    selectedCreditCard:number
}

const CreditCardDetail = ({selectedCreditCard}) =>{
    
    
    const loadCreditCardDetails = () =>{
        console.log("Loading credit card details");
    }

    
    const PaymentHistoryList = () =>{
        return(<>
            <div className="grid grid-cols-2 border-b-1 border-b-gray-600 py-1 px-1">
                <div>
                    <div><label className="text-white text-xs">Jan 2026</label></div>
                    <div><label className="text-white font-bold">₹1,240</label></div>
                </div>
                <div className="flex justify-end items-center">
                    <label className="text-sm text-green-400">PAID</label>
                </div>
            </div>
        </>);
    }
    
    useEffect(()=>{

        loadCreditCardDetails();

    },[selectedCreditCard]);
    return(
        <>
            <div className="bg-slate-900 rounded-sm border-1 border-slate-700">
                            <div className="py-2 px-2">

                                <div className="grid grid-cols-3">
                                    <div className="col-span-2">
                                        <h1 className="text-white font-bold px-2">ICICI Platinum {selectedCreditCard}</h1>
                                    </div>
                                    <div className="col-span-1 flex justify-end text-white"><IoIosClose className="cursor-pointer"/></div>

                                    <div className="col-span-3"><h1 className="text-white px-2 text-sm">**** 4973</h1></div>
                                </div>

                                <div className="pt-2 pb-1">
                                    <div className="bg-linear-to-r from-cyan-500 to-blue-500 rounded-sm px-2 py-1">
                                        <h1 className="uppercase text-white text-shadow-2xs font-bold px-1">Current Bill</h1>
                                        <h1 className="uppercase text-white text-shadow-2xs font-bold px-1">₹200</h1>
                                    </div>
                                </div>

                                <div className="pt-2">

                                    <h1 className="text-white text-sm pb-2">Payment history</h1>
                                    <div className="grid grid-cols-1 bg-slate-800 p-2 rounded-sm">
                                        <div className="col-span-1 border-b-1 border-b-slate-800">

                                            <PaymentHistoryList/>
                                            <PaymentHistoryList/>
                                            <PaymentHistoryList/>
                                            <PaymentHistoryList/>
                                            
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
        </>
    );

}

export default CreditCardDetail;