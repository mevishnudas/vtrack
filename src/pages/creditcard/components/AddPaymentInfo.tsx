import { useState } from "react";
import { SimpleInput,SimpleTextArea } from "../../../components/formElements/SimpleInputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { error_message } from "../../../utils/ErrorMessages";
import { fetchRequest } from "../../../services/Fetch";
import {format} from "date-fns";
import { VscLoading } from "react-icons/vsc";

type AddPaymentInfoProps = {
    setAddPayment:Function,
    creditCardId:Number
};

const schema = yup
  .object({
    amount: yup.number().typeError(error_message.invalid_number).required(error_message.required),
    payment_date: yup.date().typeError(error_message.invalid_date).required(error_message.required),
    remarks: yup.string().nullable()
  })
  .required()

const AddPaymentInfo = ({setAddPayment,creditCardId}:AddPaymentInfoProps) =>{
    const [submitting,setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        //getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) =>{ 
        
        setSubmitting(true);

        //change date format 
        let formated_date = format(new Date(data.payment_date),"yyyy-MM-dd");

        let params = {
            "id":creditCardId,
            "amount":data.amount,
            "payment_date":formated_date,
            "remarks":data.remarks
        }

        let response = await fetchRequest({
            auth:true,
            method:"POST",
            path:"credit-card/bill/add",
            body:params
        });

        setSubmitting(false);
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                    <SimpleInput 
                        type="number" 
                        step="any" 
                        name="amount" 
                        customClassName="w-full border-1 border-slate-700 text-white bg-gray-800"
                        placeholder="Amount"
                        autoComplete="off"
                        {...register("amount")}
                    />
                    <p className="text-red-400">{errors.amount?.message}</p>
                </div>
                <div className="col-span-1">
                    <SimpleInput 
                        type="date" 
                        name="payment_date" 
                        customClassName="w-full border-1 border-slate-700 text-white bg-gray-800"

                        {...register("payment_date")}
                    />
                    <p className="text-red-400">{errors.payment_date?.message}</p>
                </div>

                <div className="col-span-2">
                    <SimpleTextArea 
                        customClassName="w-full border-1 border-slate-700 text-white bg-gray-800"
                        placeholder="Remarks"
                        name="remarks"

                        {...register("remarks")}
                    />
                    <p>{errors.remarks?.message}</p>
                </div>
                <div className={`col-span-2 flex gap-2 select-none ${submitting&&("pointer-events-none cursor-progress")}`}>
                        <button type="submit" 
                            className="bg-sky-600 disabled:bg-sky-700 px-2 py-1 rounded-sm text-white text-sm flex items-center gap-1 cursor-pointer"
                            disabled={submitting}
                        >
                        {submitting&&(<VscLoading  className="animate-spin"/>)}
                        Submit
                        </button>

                        <button type="button" 
                            disabled={submitting} 
                            onClick={()=>setAddPayment(false)} 
                            className="px-2 py-1 rounded-sm text-gray-300 text-sm cursor-pointer">
                        Cancel
                        </button>
                </div>
            </div>
            </form>
            </>
    );
};

export default AddPaymentInfo;