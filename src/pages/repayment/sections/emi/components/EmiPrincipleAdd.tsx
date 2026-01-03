import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {error_message} from "../../../../../utils/ErrorMessages";
import {SimpleInput,SimpleSelectMultiLabel,SimpleSelectMultiLabel02,SimpleTextArea,} from "../../../../../components/formElements/SimpleInputs";
import {CustomInput,CustomButton,CustomTextArea} from "../../../../../components/formElements/input";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

const validationSchema = yup
  .object({
    principle: yup.number().typeError(error_message.required).positive(error_message.required).required(error_message.required),
    emi_amount: yup.number().typeError(error_message.required).positive(error_message.required).required(error_message.required),
    payment_date: yup.date().typeError(error_message.required).required(error_message.required),
    remarks:yup.string().nullable(),
  })
.required();

type EmiPrincipleAddProps = {
    emi_data:any[],
    addEmiPrinciple:any
};

const EmiPrincipleAdd = ({emi_data,addEmiPrinciple}:EmiPrincipleAddProps) =>{

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [submiting,setSubmiting] = useState(false);
    const [submitError,setSubmitError] = useState(false);

    const onSubmit = async (data:any) =>{
        setSubmiting(true);
        setSubmitError(false);
        let response = await addEmiPrinciple(data,emi_data.id);
        
        if(response)
        {reset();}
        else{
            setSubmitError(true);
        }
        setSubmiting(false);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-blue-800 px-2 py-2 grid grid-cols-6 gap-2">
                <div className="col-span-1 ">
                    <SimpleInput type="number" 
                                // name="principle" 
                                customClassName={`bg-gray-100 
                                text-black w-full
                                
                                ${errors.principle?.message&&"border-2 border-red-800"}
                                

                                `}
                                placeholder="Principle"
                                {...register("principle")}
                    />
                </div>
                
                <div className="col-span-3">
                    <SimpleInput type="number" {...register("emi_amount")} customClassName={`bg-gray-100 text-black w-full ${errors.emi_amount?.message&&"border-2 border-red-800"}`} placeholder="EMI Amount"/>
                </div>

                <div className="col-span-2">
                    <SimpleInput type="date" {...register("payment_date")} customClassName={`bg-gray-100 text-black w-full ${errors.payment_date?.message&&"border-2 border-red-800"} `} placeholder="EMI Amount"/>
                </div>

                <div className="col-span-4">
                    <SimpleTextArea
                        customClassName="bg-gray-100 text-black w-full"
                        placeholder="Remarks"

                        {...register("remarks")}
                    />
                </div>

                <div className="col-span-2">
                    <button type="submit" disabled={submiting} className="rounded-sm bg-gray-100 disabled:bg-gray-300 px-2 h-8 w-full text-blue-600 flex gap-2 justify-center items-center">
                        {submiting?(<><ImSpinner2 className="animate-spin" size={18}/>Adding...</>):(<>Add</>)}
                    </button>
                    {submitError&&(<p className="text-sm text-red-300">Error Occurred!</p>)}
                </div>
            </div>
        </form>
    );

    }

export default EmiPrincipleAdd;