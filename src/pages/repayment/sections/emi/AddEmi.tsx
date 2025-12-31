import {CustomInput,CustomTextArea,CustomSelect} from "../../../../components/formElements/input";
import {error_message} from "../../../../utils/ErrorMessages";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react";
import {format} from "date-fns";
import { ImSpinner2 } from "react-icons/im";
import {fetchRequest} from "../../../../services/Fetch";
// import { toast,Bounce } from 'react-toastify';
import {toastSuccessBottomRight,toastErrorBottomRight} from "../../../../utils/Toast";

const validationSchema = yup.object({
  payee:yup.number().moreThan(0,error_message.required).required(error_message.required),
  from:yup.number().moreThan(0,error_message.required).required(error_message.required),

  amount: yup.number().moreThan(0,error_message.number_more_than_error).typeError(error_message.required).required(error_message.required),
  pr_fee: yup.number().moreThan(0,error_message.number_more_than_error).typeError(error_message.required).required(error_message.required),

  emi_amount:yup.number().moreThan(0,error_message.number_more_than_error).typeError(error_message.required).required(error_message.required),
  duration:yup.number().moreThan(0,error_message.number_more_than_error).typeError(error_message.required).required(error_message.required),
  
  distributed_date:yup.date().required(error_message.required).typeError(error_message.required),
  payment_date:yup.date().required(error_message.required).typeError(error_message.required),

  remarks:yup.string()
});

type emiProps = {
    bank_list:any[],
    payee_list:any[],
    reFreshEmiList:any
};
const AddEmi = ({bank_list,payee_list,reFreshEmiList}:emiProps) =>{
    const [totalAmount,setTotalAmount] = useState(0);
    const [submitting,setSubmitting] = useState(false);
    const [submittingError,setSubmitError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const totalCalculate = (e) =>{

        let calculatedTotalAmount = 0;
        calculatedTotalAmount += parseFloat(getValues("pr_fee")|0);
        calculatedTotalAmount += parseFloat(getValues("emi_amount")|0)*parseFloat(getValues("duration")|0);
    
        setTotalAmount(calculatedTotalAmount);
    }

    const onSubmit = async (data:any) =>{

        setSubmitting(true);

        let formData = {
            payee:data.payee,
            from:data.from,

            amount:data.amount,
            pr_fee:data.pr_fee,
            emi:data.emi_amount,
            duration:data.duration,

            distributed_date:format(new Date(data.distributed_date),"Y-MM-dd"),
            payment_date:format(new Date(data.payment_date),"Y-MM-dd"),
            
            remarks:data.remarks
        }

        let params = {
            path:"repayment/emi/add",
            method:"POST",
            auth:true,
            body:formData
        };
        let response = await fetchRequest(params);

        setSubmitting(false);

        if(response.request){
            
            // toast.success('Saved Successfully !', {
            //     position: "bottom-right",
            //     autoClose: 1000,
            //     hideProgressBar: true,
            //     closeOnClick: false,
            //     pauseOnHover: false,
            //     draggable: false,
            //     progress: undefined,
            //     theme: "light",
            //     transition: Bounce,
            // });
            toastSuccessBottomRight({
                message:'Saved Successfully !'
            })

            setTotalAmount(0);
            reset();
            reFreshEmiList();
        }
        else{

            toastErrorBottomRight({
                message:'Error occurred. Please try again !'
            })

            setSubmitError("Error occurred. Please try again ");
        }
        setSubmitting(false);

        //console.log(format(new Date(data.payment_date),"Y-MM-dd"));
        //console.log(format(new Date(data.distributed_date),"Y-MM-dd"));
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
                                    optionsList={payee_list}
                                    defaultValue={0}

                                    customClassName="w-full"

                                    register={register}
                                />
                                <p className="text-red-400">{errors.payee?.message}</p>
                            </div>

                            <div>
                                <label>From</label>
                                <CustomSelect 
                                    name="from"
                                    label="Select From"
                                    optionsList={bank_list}
                                    defaultValue={0}
                                    customClassName="w-full"

                                    register={register}
                                />
                                <p className="text-red-400">{errors.from?.message}</p>
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

                                    onValueChange={totalCalculate}
                                />
                                <p className="text-red-400">{errors.pr_fee?.message}</p>
                            </div>

                            <div>
                                <label>EMI</label>
                                <CustomInput
                                    name="emi_amount"
                                    placeholder="EMI"
                                    inputType="number"

                                    register={register}

                                    onValueChange={totalCalculate}
                                />
                                <p className="text-red-400">{errors.emi_amount?.message}</p>
                            </div>

                            <div>
                                <label>Duration (Month)</label>
                                <CustomInput
                                    name="duration"
                                    placeholder="Duration"
                                    inputType="number"

                                    register={register}

                                    onValueChange={totalCalculate}
                                />
                                <p className="text-red-400">{errors.duration?.message}</p>
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
                                    <p className="font-bold">Rs.{totalAmount.toLocaleString('en-IN')}</p>
                                </div>
                            </div>

                            <div>
                                <label>Distributed Date</label>
                                <CustomInput
                                    name="distributed_date"
                                    inputType="date"

                                    register={register}
                                />
                                <p className="text-red-400">{errors.distributed_date?.message}</p>
                            </div>

                            <div>
                                <label>Payment Date</label>
                                <CustomInput
                                    name="payment_date"
                                    // placeholder="Payment Date"
                                    inputType="date"

                                    register={register}
                                />
                                <p className="text-red-400">{errors.payment_date?.message}</p>
                            </div>

                            <div className="col-span-2">
                                <label>Remarks</label>
                                <CustomTextArea
                                    name="remarks"
                                    placeholder="Remarks"
                                    customClassName="w-full"

                                    register={register}
                                />
                            </div>

                            <div className="flex">
                                <button 
                                        type="submit" 
                                        className="bg-blue-700 disabled:bg-blue-900
                                        px-2 py-1 
                                        rounded-sm w-20
                                        flex
                                        justify-center
                                        items-center
                                        w-30
                                        "
                                        disabled={submitting}
                                >   
                                {submitting?(
                                <>
                                    <ImSpinner2 size={20} className="animate-spin"/>&nbsp;&nbsp;Saving...  
                                </>
                                ):(<>
                                    Save
                                </>)}
                                </button>
                                <span className="ml-2 text-red-400">{submittingError}</span>
                            </div>

                        </div>
                    </form>

                </div>
                

            </div>

        </>
    );
}

export default AddEmi;