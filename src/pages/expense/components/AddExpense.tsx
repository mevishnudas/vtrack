import {CustomInput,CustomTextArea,CustomButton} from "../../../components/formElements/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { error_message } from "../../../utils/ErrorMessages";
import { fetchRequest } from "../../../services/Fetch";
import { useState } from "react";

const expenseSchema = yup
  .object({
    title: yup.string().required(error_message.required),
    amount: yup.number().required(error_message.required).positive(error_message.number_error).typeError(error_message.invalid_number),
    notes: yup.string().optional()
  })
  .required();

const AddExpense = () => {
    const [loading,setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(expenseSchema)
    });

    
    const onSubmit = async (data:any) =>{
        //console.log(data);
        setLoading(true);

        let response =await fetchRequest({
            path:"expense/category/add",
            method:"POST",
            auth:true,
            body:{
                name:data.category
            }
        });

        if(response.request){
            //alert("Category Added");
        }else{
            //alert("Error Adding Category");
        }

        reset(); //Reset Form
        setLoading(false);
    };

    return (<>
            <div className="px-4 py-2">

                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="text-gray-300 py-1 text-sm">Title</label>
                    <CustomInput name="title" placeholder="Title" inputType="text" register={register}/>
                    <p className="text-red-400 text-sm">{errors.title?.message}</p>
                </div>

                <div>
                    <label className="text-gray-300 py-1 text-sm">Amount</label>
                    <CustomInput name="amount" placeholder="Amount" inputType="number" step="any" register={register}/>
                    <p className="text-red-400 text-sm">{errors.amount?.message}</p>
                </div>

                <div>
                    <label className="text-gray-300 py-1 text-sm">Notes</label>
                    <CustomTextArea name="notes" placeholder="Notes" customClassName="w-full" register={register}/>
                    <p className="text-red-400 text-sm">{errors.notes?.message}</p>
                </div>

                <div className="pt-2">
                    <CustomButton label="Submit" type="submit" customClassName="bg-blue-500 px-4 text-white"/>
                </div>
                </form>

            </div>
            </>
    );

}

export default AddExpense;