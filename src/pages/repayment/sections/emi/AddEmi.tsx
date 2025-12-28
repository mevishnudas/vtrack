import {CustomInput,CustomTextArea,CustomSelect} from "../../../../components/formElements/input";
import {error_message} from "../../../../utils/ErrorMessages";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

const validationSchema = yup.object({
  amount: yup.number().moreThan(0,error_message.number_more_than_error).typeError(error_message.required).required(error_message.required),
  pr_fee: yup.number().moreThan(0,error_message.number_more_than_error).typeError(error_message.required).required(error_message.required),

  emi_amount:yup.number().moreThan(0,error_message.number_more_than_error).typeError(error_message.required).required(error_message.required),
  duration:yup.number().moreThan(0,error_message.number_more_than_error).typeError(error_message.required).required(error_message.required),
});

const AddEmi = () =>{

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    
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

    const onSubmit = () =>{
        alert("Okay");
    };

    return(
        <>
            <div>
                
                <div className="bg-slate-900 border-1 border-slate-800 rounded-sm overflow-hidden">
                    <h1 className="text-white bg-linear-to-r from-blue-500 to-cyan-500 px-2 py-1">New EMI</h1>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
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

                                    register={register}
                                />
                                <p className="text-red-400">{errors.amount?.message}</p>
                            </div>

                            <div>
                                <label>Pr.Fee</label>
                                <CustomInput
                                    name="pr_fee"
                                    placeholder="Pr.Fee"
                                    inputType="number"

                                    register={register}
                                />
                                <p className="text-red-400">{errors.pr_fee?.message}</p>
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
                                <button type="submit" className="bg-blue-700 px-2 py-1 rounded-sm w-20">Save</button>
                                <span className="ml-2 text-red-400">Error</span>
                            </div>

                        </div>
                    </form>

                </div>
                

            </div>
        </>
    );
}

export default AddEmi;