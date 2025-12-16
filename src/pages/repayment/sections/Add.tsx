import { useForm } from "react-hook-form";
import {error_message} from "../../../utils/ErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useState } from "react";

const schema = yup
  .object({
    payee:yup.number().moreThan(0, error_message.required).required(),
    amount:yup.number().required(),
    pr_fee:yup.number().required(),
    payment_date: yup.date().typeError(error_message.invalid_date).required(),
  })
  .required();

const Add = () =>{
    const [totalAmount,setTotalAmount] = useState(4464);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues:{
            payee:0
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data:any) => {
        //setLogging(true);
        // tryLogin(data);

        console.log(getValues("amount"));
        console.log("Submit");
    };

    const reCalcTotal = (event) =>{
        let amount = parseFloat(getValues("amount"))||0;
        let pr_fee = parseFloat(getValues("pr_fee"))||0;
        setTotalAmount(amount+pr_fee);
    }

    return(
        <>
            
            <div className="bg-gray-50 border-1 border-gray-300 rounded-sm">
                <h1 className="font-bold bg-blue-900 text-gray-50 px-4 py-1">New Record</h1>
                
                <form onSubmit={handleSubmit(onSubmit)} noValidate> 
                    <div className="px-4 py-3">
                        <div className="grid">
                            <label className="font-bold">Payee</label>
                            <select
                                    className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                                    
                                    {...register("payee")}
                                >
                                <option value={0} disabled>Select Payee</option>
                                <option value={1}>Vishnu das</option>
                                <option value={2}>Neethu Babu</option>
                            </select>
                            {errors.payee && <span className="text-red-500">{error_message.required}</span>}
                        </div>

                        <div className="grid">
                            <label className="font-bold">Amount</label>
                            <input type="number" 
                                placeholder="Amount"
                                className="border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                                
                                {...register("amount",{
                                        onChange: (e) => {
                                            reCalcTotal(e);
                                        }
                                })}
                            />
                            {errors.amount && <span className="text-red-500">{error_message.required}</span>}
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Pr.Fee</label>
                            <input type="number" placeholder="Pr.Fee" className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                                    
                                    {...register("pr_fee",{
                                        onChange: (e) => {
                                            reCalcTotal(e);
                                        }
                                    })}
                            />
                            {errors.pr_fee && <span className="text-red-500">{error_message.required}</span>}
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Total</label>
                            <p className="border-1 px-2 py-1 rounded-sm border-gray-300 bg-gray-200">{totalAmount.toLocaleString("en-IN")}</p>
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Payment Date</label>
                            <input type="date" 
                                    autoComplete="off"
                                    className="border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"

                                    {...register("payment_date")}
                            />
                            {errors.payment_date && <span className="text-red-500">{errors.payment_date.message}</span>}
                           
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Remarks</label>
                            <textarea  name="remarks" placeholder="Notes" className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    row-3
                                    resize-none
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="grid">
                            <button type="submit" className="bg-blue-600 active:bg-blue-800 text-amber-50 rounded-sm py-1 w-20">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;