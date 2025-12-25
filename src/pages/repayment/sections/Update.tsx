import { useEffect, useState } from "react";
import {CustomSelect,CustomInput,CustomTextArea,CustomButton} from "../../../components/formElements/input";

type updateProps = {
    selectedPaymentDetail:any[],
    bankList:any[]
};

const Update = ({selectedPaymentDetail,bankList}:updateProps) =>{
    const [paymentInfo,setPaymentInfo] = useState(selectedPaymentDetail);

    const optionsList = [
        {
            id:"PENDING",
            name:"Pending"
        },
        {
            id:"RECEIVED",
            name:"Received"
        },
        {
            id:"PARTIALLY_PAID",
            name:"Partially Paid"
        }
    ];

    useEffect(()=>{
            setPaymentInfo(selectedPaymentDetail);
            console.log(paymentInfo);
            
    },[selectedPaymentDetail]);

    return(
        <>  
            {selectedPaymentDetail.length===0?(
                <>  
                    <div className="bg-gray-800 border-1 border-gray-700 rounded-sm px-2 py-2">

                        <div className="min-h-80 flex items-center justify-center">
                            <p className="text-center text-sm text-gray-400">Click the list to update the record.</p>
                        </div>
                    
                    </div>
                </>
            ):(
                <>
                    <div className="bg-slate-900 border-1 border-gray-700 rounded-sm">
                        <h1 className="font-bold bg-orange-700 text-gray-50 px-4 py-1">Update Record</h1>
                        
                        <div className="px-4 py-2">

                            <div className="grid grid-rows-4 grid-cols-2 gap-2">

                                <div className="col-span-1">
                                    <label className="text-white font-bold">Payment Status</label>
                                    <CustomSelect
                                        name="payment_status"
                                        label="Choose Option"
                                        optionsList={optionsList}
                                        defaultValue="PENDING"

                                        customClassName="w-full"
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="text-white font-bold">From</label>
                                    <CustomSelect
                                        name="from"
                                        label="Choose Option"
                                        optionsList={bankList}
                                        defaultValue={1}

                                        customClassName="w-full"
                                    />
                                </div>
                                
                                <div className="col-span-1">
                                    <label className="text-white font-bold">Amount</label>
                                    <CustomInput
                                        name="amount"
                                        placeholder="Amount"
                                        inputType={"number"}
                                        
                                        defaultValue={paymentInfo.amount}
                                        // value={paymentInfo.amount}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-white font-bold">Pr.Fee</label>
                                    <CustomInput
                                        name="pr_fee"
                                        placeholder="Pr.Fee"
                                        inputType={"number"}

                                        defaultValue={paymentInfo.amount}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="text-white font-bold">Charges</label>
                                    <CustomInput
                                        name="charges"
                                        placeholder="Charges"
                                        inputType={"number"}

                                        defaultValue={paymentInfo.amount}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-white font-bold">Total</label>
                                    <p className="border-1 px-2 py-1 rounded-sm 

                                border-gray-500 
                                text-white
                                bg-gray-600 
                                
                                ">{(1000).toLocaleString("en-IN")}</p>
                                </div>

                                <div className="col-span-1">
                                    <label className="text-white font-bold">Distributed Date</label>
                                    <CustomInput
                                        name="distributed_date"
                                        inputType={"date"}

                                        defaultValue={"2025-12-25"}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-white font-bold">Payment Date</label>
                                    <CustomInput
                                        name="payment_date"
                                        inputType={"date"}

                                        defaultValue={"2025-12-25"}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="text-white font-bold w-full">Remarks</label>
                                    <CustomTextArea
                                        name="remarks"
                                        customClassName="w-full"
                                    />
                                </div>

                            </div>

                            {/* Button Area  */}
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <div>
                                    <CustomButton 
                                        label="Update" 
                                        customClassName="bg-green-600 text-white w-full h-8"

                                        onClick={()=>alert("Hi")}
                                    />
                                </div>
                                
                                <div className="flex justify-end">
                                    <CustomButton label="Delete" customClassName="bg-red-900 text-white w-20 h-8"/>
                                </div>
                            </div>
                            {/* Button Area Ends */}

                        </div>

                    </div>
                </>
            )}
        </>
    );

};

export default Update;