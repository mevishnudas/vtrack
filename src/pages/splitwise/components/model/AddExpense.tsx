import { useState,useEffect } from "react";

import SimpleModel from "../../../../components/modal/SimpleModel";
import Select from 'react-select'
import {SimpleTextArea} from "../../../../components/formElements/SimpleInputs";
import { ImSpinner2 } from "react-icons/im";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {fetchRequest} from "../../../../services/Fetch";

import { error_message } from "../../../../utils/ErrorMessages";
type AddExpenseProps = {
    openModel:boolean,
    setOpenModel:any,
    friends:any[],
    refreshExpenseList:any
};

const addExpenseSchema = yup
  .object({
    friends: yup.array().required(error_message.required),
    amount: yup.number().positive().typeError(error_message.required).required(error_message.required),
    remarks: yup.string().nullable(),
    split_method: yup.string().required(),
  })
.required();

const AddExpense = ({openModel,setOpenModel,friends,refreshExpenseList}:AddExpenseProps) =>{
   const [splitOptionShow,setSplitOptionShow] = useState(false);
   const [splitMethod,setSplitMethod] = useState("equally");
   const [submitting,setSubmitting] = useState(false);
   const [submittingError,setSubmitError] = useState(null);

   const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
        resolver: yupResolver(addExpenseSchema),
  })

   type SplitTypeProps = {
        splitMethod:string
   };
   const SplitType = ({splitMethod}:SplitTypeProps) =>{

        switch (splitMethod) {
            case 'ows_you':
                return <p className="text-center text-green-400 font-bold border-2 border-green-400 py-1 px-2 cursor-pointer">Owes you</p>;
                break;

            case 'you_ows':
                return <p className="text-center text-red-400 font-bold border-2 border-red-400 py-1 px-2 cursor-pointer">You owe</p>;
                break;

            default:
                 return <p className="text-center text-white font-bold border-2 border-slate-600 py-1 cursor-pointer"> Paid by you and split equally</p>;
                break;
        }
       
   }

   const selectSplitMethod = (method:string) =>{
        setSplitMethod(method);
        setSplitOptionShow(false);

        //Select Split Method
        setValue("split_method",method);
   }

   const onSubmit = async (data) =>{
        
        setSubmitError(null);
        setSubmitting(true);
        let response = await fetchRequest({
            path:"splitwise/expense/add",
            auth:true,
            method:"POST",
            body:{
                split_method:data.split_method,
                friends:data.friends,
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

   const onFriendChange = (selectedFriends) =>{
        const friends = selectedFriends.map(item => item.value);
        setValue("friends",friends);
   }

   useEffect(()=>{
        setSplitOptionShow(false);
        setValue("split_method",splitMethod);
        
        return()=>{
            reset();
            setSplitMethod("equally");
            setSubmitError(null);
        };

   },[openModel]);

   return(
        <SimpleModel isOpen={openModel} setModelStatus={setOpenModel}>

                    <div className="bg-orange-600 text-gray-50 px-2 py-1 text-shadow-sm text-shadow-gray-600 rounded-t-sm">Add an expense</div>
                    <div className="flex gap-2 justify-center items-start">

                        <div className="py-2 px-2 w-100 bg-slate-800 rounded-b-sm">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="text-gray-300 text-sm">With you and</label>
                                    <Select 
                                        options={friends} 
                                        isMulti 
                                        // name="friends"  
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
                                
                                <div className="pt-5" 
                                        onClick={()=>!submitting&&(setSplitOptionShow(true))} 
                                    >
                                    <SplitType 
                                        splitMethod={splitMethod}
                                    />
                                </div>

                                <div className="pt-5 flex justify-end gap-2">
                                    <p className="text-red-400">{submittingError}</p>
                                    <button className="text-black bg-gray-300 px-2 py-1 rounded-sm w-20 cursor-pointer" onClick={()=>setOpenModel(false)} disabled={submitting}>Cancel</button>
                                    <button className="text-white bg-orange-600 disabled:bg-orange-800 px-2 py-1 rounded-sm w-20 flex gap-2 items-center justify-center cursor-pointer" type="submit" disabled={submitting}>
                                        {submitting?(<ImSpinner2  size={20} className="animate-spin"/>):(<>Save</>)}
                                    </button>
                                </div>
                                
                            </form>

                            <div className="relative">
                                <div className={`bg-slate-800 px-2 py-2 rounded-sm transition-all duration-400 ease-in-out absolute bottom-58 w-full -z-1 ${splitOptionShow?("left-100 opacity-100"):("opacity-0 left-50")}`}>
                                    <div>
                                        <p className="text-center text-white font-bold border-2 border-slate-600 py-1 px-2 cursor-pointer" onClick={()=>selectSplitMethod("equally")}>Paid by you and split equally</p>
                                        <p className="text-center mt-2 text-green-400 font-bold border-2 border-slate-600 py-1 px-2 cursor-pointer" onClick={()=>selectSplitMethod("ows_you")}>Owes you</p>
                                        <p className="text-center mt-2 text-red-400 font-bold border-2 border-slate-600 py-1 px-2 cursor-pointer" onClick={()=>selectSplitMethod("you_ows")}>You owe</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        
                    </div>
        </SimpleModel> 
   ); 
};

export default AddExpense;