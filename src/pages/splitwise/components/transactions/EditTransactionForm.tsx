import {useState} from "react";
import { SimpleInput,SimpleTextArea } from "../../../../components/formElements/SimpleInputs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImSpinner3 } from "react-icons/im";
import { error_message } from "../../../../utils/ErrorMessages";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { fetchRequest } from "../../../../services/Fetch";

type EditTransactionFormProps = {
    selectedTransaction:any,
    setSelectedTransaction:Function,
    refreshExpenseList:Function
}

const EditTransactionForm = ({selectedTransaction,setSelectedTransaction,refreshExpenseList}:EditTransactionFormProps) =>{
    const [loading,setLoading] = useState(false);

    const schema = yup
    .object({
        amount: yup.number().positive(error_message.number_more_than_error).required().typeError(error_message.invalid_number),
        remarks: yup.string().nullable(),
    }).required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })


    const updateTransaction = async (data) =>{
        setLoading(true);
        
        let response = await fetchRequest({
            path:"splitwise/expense/friend/transaction/update",
            method:"POST",
            auth:true,
            body:{
                "id":selectedTransaction.id,
                "amount":data.amount,
                "remarks":data.remarks
            }
        });
        
        setSelectedTransaction([]);
        refreshExpenseList();
    }   

    const deleteTransaction = async () =>{
        setLoading(true);
        
        let response = await fetchRequest({
            path:"splitwise/expense/friend/transaction/delete",
            method:"POST",
            auth:true,
            body:{
                "id":selectedTransaction.id
            }
        });

        setSelectedTransaction([]);
        refreshExpenseList();
    }

    return(
            <>
            <div className="pt-2 border-b-gray-800 border-b-1 rounded-sm p-2">
                <form onSubmit={handleSubmit(updateTransaction)}>
                    <div>
                        <label className="text-sm text-gray-300">Amount</label>
                        <SimpleInput 
                            type="number"
                            step="any"
                            customClassName="border-2 border-slate-800 w-full" 
                            placeholder="Amount"
                            defaultValue={selectedTransaction.amount}
                            {...register("amount")}
                            autoComplete="off"
                        />
                        <p className="text-red-400">{errors.amount?.message}</p>
                    </div>
                    <div className="pt-2">
                        <label className="text-sm text-gray-300">Remarks</label>
                        <SimpleTextArea 
                            customClassName="border-2 border-slate-800 w-full p-2" 
                            placeholder="Remarks"
                            defaultValue={selectedTransaction.remarks}
                            {...register("remarks")}
                        />
                        <p className="text-red-400">{errors.remarks?.message}</p>
                    </div>

                    <div className="pt-2 flex justify-between">
                        <div>
                            <button 
                                    disabled={loading} 
                                    type="button"
                                    className="text-red-400 hover:text-red-500 disabled:text-red-400"

                                    onClick={deleteTransaction}
                            >
                                <RiDeleteBin6Line className="cursor-pointer"/>
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button type="button" disabled={loading} onClick={()=>setSelectedTransaction([])} className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-400 rounded-sm px-2 text-black cursor-pointer">Cancel</button>
                            
                            <button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800 disabled:bg-green-800 rounded-sm px-2 cursor-pointer flex justify-center items-center gap-2">
                                {loading&&<ImSpinner3 className="animate-spin"/>}
                                Update
                            </button>

                        </div>
                    </div>
                </form>
            </div>
            </>
        );
}
export default EditTransactionForm;