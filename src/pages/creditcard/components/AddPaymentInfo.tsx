import { SimpleInput,SimpleTextArea } from "../../../components/formElements/SimpleInputs";

type AddPaymentInfoProps = {
    setAddPayment:any
};

const AddPaymentInfo = ({setAddPayment}:AddPaymentInfoProps) =>{
    return(
        <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                    <SimpleInput 
                        type="number" 
                        step="any" 
                        name="amount" 
                        customClassName="w-full border-1 border-slate-700 text-white bg-gray-800"
                        placeholder="Amount"
                    />
                </div>
                <div className="col-span-1">
                    <SimpleInput 
                        type="date" 
                        name="payment_date" 
                        customClassName="w-full border-1 border-slate-700 text-white bg-gray-800"
                    />
                </div>

                <div className="col-span-2">
                    <SimpleTextArea 
                        customClassName="w-full border-1 border-slate-700 text-white bg-gray-800"
                        placeholder="Remarks"
                    />
                </div>
                <div className="col-span-2">
                    <button className="bg-sky-500 px-2 py-1 rounded-sm text-white text-sm">Submit</button>
                    <button onClick={setAddPayment(false)} className="px-2 py-1 rounded-sm text-gray-300 text-sm">Cancel</button>
                </div>
            </div>
    );
};

export default AddPaymentInfo;