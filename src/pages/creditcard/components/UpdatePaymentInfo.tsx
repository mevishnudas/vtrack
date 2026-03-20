import { useEffect, useState } from "react";
import { SimpleTextArea,SimpleInput,SimpleSelectMultiLabel } from "../../../components/formElements/SimpleInputs";
import { VscLoading } from "react-icons/vsc";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { error_message } from "../../../utils/ErrorMessages";

type UpdatePaymentInfoProps ={
    selectedPaymentInfo:any[],
    setSelectedPaymentInfo:Function
}

const schema = yup
  .object({
    amount: yup.number().typeError(error_message.invalid_number).required(error_message.required),
    payment_date: yup.date().typeError(error_message.invalid_date).required(error_message.required),
    payment_status:yup.number().required(error_message.required),
    remarks: yup.string().nullable()
  })
  .required()

const UpdatePaymentInfo = ({selectedPaymentInfo,setSelectedPaymentInfo}:UpdatePaymentInfoProps) =>{
    const [submitting,setSubmitting] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) =>{
        console.log(data);
    } 

    const optionList = [
        {
            "label":"Test",
            "value":1
        }
    ]
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
                            defaultValue={selectedPaymentInfo.amount}

                            {...register("amount")}
                        />
                        <p className="text-red-400">{errors.amount?.message}</p>
                    </div>
                    
                    <div className="col-span-1">
                        <SimpleInput 
                            type="date" 
                            name="payment_date" 
                            customClassName="w-full border-1 border-slate-700 text-white bg-gray-800"

                            defaultValue={selectedPaymentInfo.payment_date}
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

                            defaultValue={selectedPaymentInfo.remarks}
                        />
                        <p className="text-red-400">{errors.remarks?.message}</p>
                    </div>

                    <div className="col-span-2">
                        <SimpleSelectMultiLabel
                            name="payment_status"
                            optionList={optionList}
                            defaultLabelValue={1}

                            customClassName="w-full"
                            {...register("payment_status")}
                        />
                        <p className="text-red-400">{errors.payment_status?.message}</p>
                    </div>

                    <div className={`col-span-2 flex gap-2 select-none ${submitting&&("pointer-events-none cursor-progress")}`}>
                            <button type="submit" 
                                className="bg-sky-600 disabled:bg-sky-700 px-2 py-1 rounded-sm text-white text-sm flex items-center gap-1 cursor-pointer"
                                disabled={submitting}
                            >
                            {submitting&&(<VscLoading  className="animate-spin"/>)}
                            Update
                            </button>

                            <button type="button" 
                                //disabled={submitting} 
                                onClick={()=>setSelectedPaymentInfo(false)} 
                                className="px-2 py-1 rounded-sm text-gray-300 text-sm cursor-pointer">
                            Cancel
                            </button>
                    </div>
            </div>
        </form>
        </>
    );

};

export default UpdatePaymentInfo;