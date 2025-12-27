import {CustomInput,CustomTextArea,CustomSelect} from "../../../../components/formElements/input";

const AddEmi = () =>{
    const payee = [
        {
            id:1,
            name:"Vishnu",
        },
        {
            id:2,
            name:"Das",
        }
    ];
    return(
        <>
            <div>
                
                <div className="bg-slate-900 border-1 border-slate-800 rounded-sm overflow-hidden">
                    <h1 className="text-white bg-linear-to-r from-blue-500 to-cyan-500 px-2 py-1">New EMI</h1>
                    
                    <div className="grid grid-cols-2 gap-2 px-2 py-1">
                        <div>
                            <label>Payee</label>
                            <CustomSelect 
                                name="payee"
                                label="Select Payee"
                                optionsList={payee}
                                defaultValue={0}

                                customClassName="w-full"
                            />
                        </div>

                        <div>
                            <label>From</label>
                            <CustomSelect 
                                name="payee"
                                label="Select From"
                                optionsList={payee}
                                defaultValue={0}
                                customClassName="w-full"
                            />
                        </div>

                        <div>
                            <label>Amount</label>
                            <CustomInput
                                name="amount"
                                placeholder="Amount"
                                inputType="number"
                            />
                        </div>

                        <div>
                            <label>Pr.Fee</label>
                            <CustomInput
                                name="pr_fee"
                                placeholder="Pr.Fee"
                                inputType="number"
                            />
                        </div>

                        <div>
                            <label>EMI</label>
                            <CustomInput
                                name="emi_amount"
                                placeholder="EMI"
                                inputType="number"
                            />
                        </div>

                        <div>
                            <label>Duration (Month)</label>
                            <CustomInput
                                name="duration"
                                placeholder="Duration"
                                inputType="number"
                            />
                        </div>

                        <div className="col-span-2">
                            <div className="w-full 
                                            px-1 py-1 
                                            bg-slate-800 rounded-sm 
                                            border-1 
                                            border-slate-600 
                                            text-center
                                            
                                            ">
                                <p className="text-slate-200">Estimated Total Amount (Ex.GST)</p>
                                <p className="font-bold">Rs.0</p>
                            </div>
                        </div>

                        <div>
                            <label>Payment Date</label>
                            <CustomInput
                                name="payment_date"
                                // placeholder="Payment Date"
                                inputType="date"
                            />
                        </div>

                        <div>
                            <label>Distributed Date</label>
                            <CustomInput
                                name="distributed_date"
                                inputType="date"
                            />
                        </div>

                        <div className="col-span-2">
                            <label>Remarks</label>
                            <CustomTextArea
                                name="duration"
                                placeholder="Duration"
                                customClassName="w-full"
                            />
                        </div>

                        <div>
                            <button className="bg-blue-700 px-2 py-1 rounded-sm w-20">Save</button>
                            <span className="ml-2 text-red-400">Error</span>
                        </div>

                    </div>

                </div>
                

            </div>
        </>
    );
}

export default AddEmi;