import { useEffect } from "react";
import {CustomSelect,CustomInput,CustomTextArea} from "../../../components/formElements/input";

type updateProps = {
    selectedPaymentDetail:any[],
    bankList:any[]
};

const Update = ({selectedPaymentDetail,bankList}:updateProps) =>{

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
    // useEffect(()=>{

    // },[]);

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

                            <div className="grid grid-rows-4 grid-cols-2">

                                <div className="col-span-1 pr-1">
                                    <label className="text-white font-bold">Payment Status</label>
                                    <CustomSelect
                                        name="payment_status"
                                        label="Choose Option"
                                        optionsList={optionsList}
                                        defaultValue="PENDING"

                                        customClassName="w-full"
                                    />
                                </div>

                                <div className="col-span-1 pl-1">
                                    <label className="text-white font-bold">From</label>
                                    <CustomSelect
                                        name="from"
                                        label="Choose Option"
                                        optionsList={bankList}
                                        defaultValue={1}

                                        customClassName="w-full"
                                    />
                                </div>
                                
                                <div className="col-span-1 pr-1">
                                    <label className="text-white font-bold">Amount</label>
                                    <CustomInput
                                        name="amount"
                                        placeholder="Amount"
                                        inputType={"number"}
                                    />
                                </div>
                                <div className="col-span-1 pl-1">
                                    <label className="text-white font-bold">Pr.Fee</label>
                                    <CustomInput
                                        name="pr_fee"
                                        placeholder="Pr.Fee"
                                        inputType={"number"}
                                    />
                                </div>

                                <div className="col-span-1 pr-1">
                                    <label className="text-white font-bold">Charges</label>
                                    <CustomInput
                                        name="charges"
                                        placeholder="Charges"
                                        inputType={"number"}
                                    />
                                </div>
                                <div className="col-span-1 pl-1">
                                    <label className="text-white font-bold">Total</label>
                                </div>

                                <div className="col-span-1 pr-1">
                                    <label className="text-white font-bold">Distributed Date</label>
                                    <CustomInput
                                        name="distributed_date"
                                        inputType={"date"}
                                    />
                                </div>
                                <div className="col-span-1 pl-1">
                                    <label className="text-white font-bold">Payment Date</label>
                                    <CustomInput
                                        name="payment_date"
                                        inputType={"date"}
                                    />
                                </div>

                                <div className="col-span-2 pr-1">
                                    <label className="text-white font-bold w-full">Remarks</label>
                                    <CustomTextArea
                                        name="remarks"
                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                </>
            )}
        </>
    );

};

export default Update;