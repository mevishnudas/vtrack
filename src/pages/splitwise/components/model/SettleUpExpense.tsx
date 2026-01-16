import { useState,useEffect } from "react";

import SimpleModel from "../../../../components/modal/SimpleModel";
import Select from 'react-select';
import {SimpleTextArea} from "../../../../components/formElements/SimpleInputs";
import { ImSpinner2 } from "react-icons/im";
import {fetchRequest} from "../../../../services/Fetch";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { error_message } from "../../../../utils/ErrorMessages";

type SettleUpExpense = {
    openModel:boolean,
    setOpenModel:any,
    friends:number,
    refreshExpenseList:any
};

const settleUpExpenseSchema = yup
  .object({
    friend: yup.number().positive().typeError(error_message.required).required(error_message.required),
    amount: yup.number().positive().typeError(error_message.required).required(error_message.required),
    remarks: yup.string().nullable(),
  })
.required();

const SettleUpExpense = ({openModel,setOpenModel,friends,refreshExpenseList}:SettleUpExpense) =>{
    
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm({
            resolver: yupResolver(settleUpExpenseSchema),
    })

    const [submitting,setSubmitting] = useState(false);
    const [submittingError,setSubmitError] = useState(null);

    const onSubmit = async (data) =>{
        
        setSubmitError(null);
        setSubmitting(true);

        let response = await fetchRequest({
            path:"splitwise/expense/settle-up",
            auth:true,
            method:"POST",
            body:{
                friend:data.friend,
                amount:data.amount,
                remarks:data.remarks
            }
        });

        setSubmitting(false);

        if(response.request){
            setOpenModel(false);
            refreshExpenseList();
        }else{
            setSubmitError("Please try again.");
        }
        
   }

    const onFriendChange = (selectedFriends:any) =>{
        setValue("friend",selectedFriends.value);
    }

    useEffect(()=>{

        return()=>{
            reset();
            setSubmitError(null);
        };

   },[openModel]);

    return(
                <SimpleModel isOpen={openModel} setModelStatus={setOpenModel}>

                    <div className="bg-green-600 text-gray-50 px-2 py-1 text-shadow-sm text-shadow-gray-500 rounded-t-sm">Settle up</div>
                    <div className="flex gap-2 justify-center items-start">

                        <div className="py-2 px-2 w-100 bg-slate-800 rounded-b-sm">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="text-gray-300 text-sm">Paid by</label>
                                    <Select 
                                        options={friends}  
                                        className="text-black bg-amber-900" 
                                        classNamePrefix="select"

                                        onChange={onFriendChange}
                                    />
                                    <p className="text-red-400 text-sm">{errors.friends?.message}</p>
                                </div>

                                <div className="pt-2">
                                    <label className="text-sm text-gray-300">Amount</label>
                                    <input type="number" autoFocus={true} 
                                        className="w-full bg-slate-700 outline-none px-2 py-1 font-bold text-white rounded-sm border-t-0 border-l-0 border-r-0 [appearance:textfield]
                                        [&::-webkit-outer-spin-button]:appearance-none
                                        [&::-webkit-inner-spin-button]:appearance-none"
                                        {...register("amount")}
                                        
                                        placeholder="Amount"
                                        />
                                    <p className="text-red-400 text-sm">{errors.amount?.message}</p>
                                </div>

                                <div className="pt-2">
                                    <label className="text-sm text-gray-300">Remarks</label>
                                    <SimpleTextArea customClassName="w-full bg-slate-700 text-white" {...register("remarks")} placeholder="Type your message..."/>
                                </div>
                                

                                <div className="pt-5 flex justify-end gap-2">
                                    <p className="text-red-400">{submittingError}</p>
                                    <button className="text-black bg-gray-300 px-2 py-1 rounded-sm w-20 cursor-pointer" onClick={()=>setOpenModel(false)} disabled={submitting}>Cancel</button>
                                    <button className="text-white bg-green-600 disabled:bg-green-800 px-2 py-1 rounded-sm w-20 flex gap-2 items-center justify-center cursor-pointer" type="submit" disabled={submitting}>
                                        {submitting?(<ImSpinner2  size={20} className="animate-spin"/>):(<>Save</>)}
                                    </button>
                                </div>
                                
                            </form>

                        </div>
                    </div>
        </SimpleModel> 
    )

};

export default SettleUpExpense;