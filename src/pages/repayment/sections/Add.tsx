import { useForm } from "react-hook-form";
import {error_message} from "../../../utils/ErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useState} from "react";
import {formatDate} from "../../../utils/DateFormat";
import {fetchRequest} from "../../../services/Fetch";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    payee:yup.number().moreThan(0, error_message.required).required(),
    amount:yup.number().typeError(error_message.invalid_date).required(error_message.required),
    pr_fee:yup.number().typeError(error_message.invalid_date).required(error_message.required),
    charges:yup.number().typeError(error_message.invalid_date).required(error_message.required),
    payment_date: yup.date().typeError(error_message.invalid_date).required(),
    distributed_date:yup.date().typeError(error_message.invalid_date).required(),
    remarks:yup.string()
  })
  .required();

const Add = () =>{
    const navigate = useNavigate();
    const [totalAmount,setTotalAmount] = useState(0);

    const {
        register,
        handleSubmit,
        //setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues:{
            payee:0
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data:any) => {
        console.log(data);
        let elements = {
            payee:data.payee,
            amount:data.amount,
            pr_fee:data.pr_fee,
            charges:data.charges,
            payment_date:formatDate(data.payment_date),
            distributed_date:formatDate(data.distributed_date),
            remarks:data?.remarks
        };

        let params = {
            path:"repayment/add",
            method:"POST",
            auth:true,
            body:elements
        };
        await fetchRequest(params,navigate);
    };

    const reCalcTotal = (event) =>{
        let amount = parseFloat(getValues("amount"))||0;
        let pr_fee = parseFloat(getValues("pr_fee"))||0;
        let charges = parseFloat(getValues("charges"))||0;
        setTotalAmount(amount+pr_fee+charges);
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
                                <option value={3}>Neethu Babu</option>
                            </select>
                            {errors.payee && <span className="text-red-500">{errors.payee?.message}</span>}
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
                            {errors.amount && <span className="text-red-500">{errors.amount?.message}</span>}
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
                            {errors.pr_fee && <span className="text-red-500">{errors.pr_fee?.message}</span>}
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Charges</label>
                            <input type="number" placeholder="Charges" className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                                    
                                    {...register("charges",{
                                        onChange: (e) => {
                                            reCalcTotal(e);
                                        }
                                    })}
                            />
                            {errors.charges && <span className="text-red-500">{errors.charges?.message}</span>}
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
                            <label className="font-bold">Distributed Date</label>
                            <input type="date" 
                                    autoComplete="off"
                                    className="border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"

                                    {...register("distributed_date")}
                            />
                            {errors.distributed_date && <span className="text-red-500">{errors.distributed_date.message}</span>}
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Remarks</label>
                            <textarea placeholder="Notes" className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    row-3
                                    resize-none
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"

                                    {...register("remarks")}
                            />
                        </div>

                        <div className="grid">

                            <button type="submit" className="bg-blue-600 active:bg-blue-800 text-amber-50 rounded-sm py-1">
                                Submit

                                {/* <span className="text-amber-50">Loading...</span> */}

                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;