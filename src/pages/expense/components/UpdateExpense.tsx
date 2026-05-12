import {CustomInput,CustomTextArea,CustomButton} from "../../../components/formElements/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { error_message } from "../../../utils/ErrorMessages";
import { fetchRequest } from "../../../services/Fetch";
import { useEffect, useState } from "react";
import Select2 from "../../../components/formElements/Select2";
import { format } from "date-fns";
import { CgSpinner } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";

const expenseSchema = yup
  .object({
    title: yup.string().required(error_message.required),
    date: yup.date().typeError(error_message.invalid_date).required(error_message.required),
    amount: yup.number().required(error_message.required).positive(error_message.number_error).typeError(error_message.invalid_number),
    category: yup.number().required(error_message.required).positive(error_message.required),
    notes: yup.string().nullable()
  })
  .required();

type UpdateExpenseProps = {
    categoryList:any[],
    selectedDate:String,
    loadExpenses:Function,
    loadOverView:Function,
    selectedExpense:any[],
    setSelectedExpense:Function
}

const UpdateExpense = ({categoryList,loadExpenses,selectedDate,loadOverView,selectedExpense,setSelectedExpense}:UpdateExpenseProps) =>{
    
    const [selectedCategory,setSelectedCategory] = useState(null);
    
    const [loading,setLoading] = useState(false);
    const [submitError,setSubmitError] = useState("");

    const {
            register,
            handleSubmit,
            reset,
            setValue,
            //getValues,
            formState: { errors }
        } = useForm({
            defaultValues:{
                category:0
            },
            resolver: yupResolver(expenseSchema)
        });

    const onSubmit = async (data:any) =>{

        setSubmitError("");
        setLoading(true);

        let response = await fetchRequest({
            path:"expense/update",
            method:"POST",
            auth:true,
            body:{
                id:selectedExpense?.id,
                title:data.title,
                date:format(new Date(data.date), "yyyy-MM-dd"),
                amount:data.amount,
                category:data.category,
                notes:data.notes
            }
        });

        if(response.request){
            setSelectedExpense();
            // reset(); // Reset Form

            //Reload Expense List
            loadExpenses({
                date:selectedDate,
                showLoading:false
            });
            loadOverView();

        }else{
            setSubmitError(error_message.submit_error)
        }

        setLoading(false);

    }

    const deleteExpense = async () =>{

        setSubmitError("");
        setLoading(true);

        let response = await fetchRequest({
            path:"expense/delete",
            method:"POST",
            auth:true,
            body:{
                id:selectedExpense?.id
            }
        });

        if(response.request){
            setSelectedExpense();

            //Reload Expense List
            loadExpenses({
                date:selectedDate,
                showLoading:false
            });

            loadOverView();

        }else{
            setSubmitError(error_message.submit_error)
        }

        setLoading(false);
    };

    useEffect(()=>{

        setSelectedCategory({
            value:selectedExpense.category_id,
            label:selectedExpense.category_name
        });
        
        reset({
            title: selectedExpense?.title,
            date: format(new Date(selectedExpense?.transaction_date),"yyyy-MM-dd"),
            category: selectedExpense?.category_id,
            amount: selectedExpense?.amount,
            notes: selectedExpense?.notes,
        });

    },[selectedExpense]);

    return(<>
            <div className={`px-4 py-2 ${loading&&("pointer-events-none")}`}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                            <label className="text-gray-300 py-1 text-sm">Title</label>
                            <CustomInput 
                                name="title" placeholder="Title" inputType="text" 
                                //defaultValue={selectedExpense?.title} 
                                register={register}/>
                            <p className="text-red-400 text-sm">{errors.title?.message}</p>
                        </div>

                        <div className="col-span-1">
                            <label className="text-gray-300 py-1 text-sm ">Transaction date</label>
                            <CustomInput name="date"  placeholder="Date" inputType="date" register={register} customClassName="date-input"/>
                            <p className="text-red-400 text-sm">{errors.date?.message}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                            <label className="text-gray-300 py-1 text-sm">Amount</label>
                            <CustomInput name="amount" placeholder="Amount" inputType="number" step="any" register={register} autoComplete="off"/>
                            <p className="text-red-400 text-sm">{errors.amount?.message}</p>
                        </div>

                        <div className="col-span-1">
                            <label className="text-gray-300 py-1 text-sm">Category</label>
                            <Select2

                                {...register("category")}

                                options={
                                    categoryList.map((item:any)=>({
                                        value:item.id,
                                        label:item.name
                                    }))
                                }
                                
                                value={selectedCategory}
                                
                                onChange={(option:any) => {
                                    setValue("category",option?.value);
                                    setSelectedCategory(option);
                                }}

                                isClearable
                            />
                            <p className="text-red-400 text-sm">{errors.category?.message}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-300 py-1 text-sm">Notes</label>
                        <CustomTextArea  name="notes" placeholder="Notes" customClassName="w-full" register={register}/>
                        <p className="text-red-400 text-sm">{errors.notes?.message}</p>
                    </div>

                    <div className="pt-2 flex gap-2">
                        <div className="flex gap-2">
                        <CustomButton 
                            icon={loading&&(<CgSpinner size={18} className="animate-spin"/>)} 
                            
                            label="Update" 
                            type="submit" 
                            disabled={loading}

                            customClassName={`cursor-pointer flex justify-center items-center gap-1 ${loading?"bg-green-800":"bg-green-600"} px-4 text-white`}/>

                        <CustomButton 
                            label="Cancel" 
                            type="button" 
                            disabled={loading}

                            onClick={()=>setSelectedExpense()}

                        customClassName={`cursor-pointer flex justify-center items-center gap-1 ${loading?"bg-gray-800":"bg-gray-200"} px-4 text-black`}/>

                        </div>

                        <div className="w-100 flex justify-end">
                        <CustomButton 
                            label="" 
                            type="button" 
                            title="Delete"
                            disabled={loading}

                            icon={<RiDeleteBin6Line size={18}/>}

                            onClick={deleteExpense}
                            

                            customClassName={`cursor-pointer ${loading?"text-red-200":"text-red-400"} text-black`}/>
                        </div>

                        <p className="text-red-400 text-sm">{submitError}</p>
                    </div>
                </form>

            </div>
            </>
    )
}

export default UpdateExpense;