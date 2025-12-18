import { useForm } from "react-hook-form";
import {error_message} from "../../../utils/ErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useState} from "react";
import {formatDate} from "../../../utils/DateFormat";
import {fetchRequest} from "../../../services/Fetch";
import { ImSpinner2 } from "react-icons/im";

import { ToastContainer, toast,Bounce } from 'react-toastify';

const schema = yup
  .object({
    payee:yup.number().moreThan(0, error_message.required).required(),
    from:yup.number().moreThan(0,error_message.required).required(), 
    amount:yup.number().typeError(error_message.invalid_date).required(error_message.required),
    pr_fee:yup.number().typeError(error_message.invalid_date).required(error_message.required),
    charges:yup.number().typeError(error_message.invalid_date).required(error_message.required),
    payment_date: yup.date().typeError(error_message.invalid_date).required(),
    distributed_date:yup.date().typeError(error_message.invalid_date).required(),
    remarks:yup.string()
  })
  .required();

type params ={
    bankList:any[],
    userList:any[],
    refreshList:object
};

const Add = ({refreshList,bankList,userList}:params) =>{

    const [submitBtnDisabled,setSubmitBtnDisabled] = useState(false);
    const [submitError,setSubmitError] = useState("");
    const [totalAmount,setTotalAmount] = useState(0);

    const {
        register,
        handleSubmit,
        //setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues:{
            payee:0,
            from:0
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data:any) => {
        //console.log(data);
        setSubmitError("");
        setSubmitBtnDisabled(true);

        let elements = {
            payee:data.payee,
            amount:data.amount,
            pr_fee:data.pr_fee,
            charges:data.charges,
            payment_date:formatDate(data.payment_date),
            distributed_date:formatDate(data.distributed_date),
            remarks:data?.remarks,
            from:data.from
        };

        let params = {
            path:"repayment/add",
            method:"POST",
            auth:true,
            body:elements
        };
        let response = await fetchRequest(params);
        
        setSubmitBtnDisabled(false);
        if(response.request){
            //reset form
            toast.success('Submitted Successfully', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            
            setTotalAmount(0);
            reset();
            refreshList();

        }else{
            
            toast.error(error_message.submit_error, {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setSubmitError(error_message.submit_error);
            
        }
        
    };

    const reCalcTotal = (event) =>{
        let amount = parseFloat(getValues("amount"))||0;
        let pr_fee = parseFloat(getValues("pr_fee"))||0;
        let charges = parseFloat(getValues("charges"))||0;
        setTotalAmount(amount+pr_fee+charges);
    }

    return(
        <>  
            <div className="bg-slate-900 border-1 border-gray-700 rounded-sm">
                <h1 className="font-bold bg-blue-900 text-gray-50 px-4 py-1">New Record</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate> 
                    <div className="px-4 py-3">

                        <div className="grid grid-cols-2">
                            <div className="col-span-1 pr-1">
                                <label className="font-bold text-gray-200">Payee</label>
                                <select
                                        className="
                                        w-full
                                        border-1 
                                        border-gray-600 
                                        text-white
                                        bg-gray-800
                                        px-2 py-1
                                        outline-none rounded-sm     
                                        [appearance:textfield]
                                        [&::-webkit-outer-spin-button]:appearance-none
                                        [&::-webkit-inner-spin-button]:appearance-none"
                                        
                                        {...register("payee")}
                                    >
                                    <option value={0} disabled>Select Payee</option>
                                    {userList.map(row=>(
                                        <option key={row.id} value={row.id}>{row.name}</option>
                                    ))}
                                </select>
                                {errors.payee && <span className="text-red-500">{errors.payee?.message}</span>}
                            </div>
                            <div className="col-span-1">
                                <label className="font-bold text-gray-200">From</label>
                                    <select
                                            className="
                                            w-full
                                            border-1 
                                            border-gray-600 
                                            text-white
                                            bg-gray-800 
                                            px-2 py-1 
                                            outline-none rounded-sm     
                                            [appearance:textfield]
                                            [&::-webkit-outer-spin-button]:appearance-none
                                            [&::-webkit-inner-spin-button]:appearance-none"
                                            
                                            {...register("from")}
                                        >
                                        <option value={0} disabled>Select from</option>
                                            {bankList.map(row=>(
                                                <option  key={row.id} value={row.id}>{row.name}</option>
                                            ))}
                                    </select>
                                    {errors.from && <span className="text-red-500">{errors.from?.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 grid-rows-2 pt-1">
                            <div className="col-span-1 pr-1">

                                <label className="font-bold text-gray-200">Amount</label>
                                <input type="number" 
                                    placeholder="Amount"
                                    className="border-1 
                                        border-gray-600 
                                        text-white
                                        bg-gray-800 
                                        px-2 py-1 
                                        w-full
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

                            <div className="col-span-1 pt-1">

                                <label className="font-bold text-gray-300">Pr.Fee</label>
                                <input type="number" placeholder="Pr.Fee" className="
                                        border-1 
                                        border-gray-600 
                                        text-white
                                        bg-gray-800 
                                        px-2 py-1 
                                        w-full
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

                            <div className="col-span-1 pr-1">
                                <label className="font-bold text-gray-300">Charges</label>
                                <input type="number" placeholder="Charges" className="
                                        border-1 
                                        border-gray-600 
                                        text-white
                                        bg-gray-800 
                                        px-2 py-1 
                                        w-full
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

                            <div className="col-span-1 text-gray-300">
                                <label className="font-bold">Total</label>
                                <p className="border-1 px-2 py-1 rounded-sm 

                                border-gray-500 
                                text-white
                                bg-gray-600 
                                
                                ">{totalAmount.toLocaleString("en-IN")}</p>
                            </div>

                        </div>
                        
                        <div className="grid py-2 grid-cols-2">

                            <div className="col-span-1 pr-1">
                                <label className="font-bold text-gray-300">Distributed Date</label>
                                <input type="date" 
                                        autoComplete="off"
                                        className="border-1 
                                        border-gray-600 
                                        text-white
                                        bg-gray-800
                                        px-2 py-1 
                                        outline-none rounded-sm
                                        w-full     
                                        [appearance:textfield]
                                        [&::-webkit-outer-spin-button]:appearance-none
                                        [&::-webkit-inner-spin-button]:appearance-none"

                                        {...register("distributed_date")}
                                />
                                {errors.distributed_date && <span className="text-red-500">{errors.distributed_date.message}</span>}
                            </div>
                            <div className="col-span-1">
                                <label className="font-bold text-gray-300">Payment Date</label>
                                <input type="date" 
                                        
                                        autoComplete="off"
                                        className="border-1 
                                        border-gray-600 
                                        text-white
                                        bg-gray-800 
                                        px-2 py-1 
                                        w-full
                                        outline-none rounded-sm     
                                        [appearance:textfield]
                                        [&::-webkit-outer-spin-button]:appearance-none
                                        [&::-webkit-inner-spin-button]:appearance-none"

                                        {...register("payment_date")}
                                />
                                {errors.payment_date && <span className="text-red-500">{errors.payment_date.message}</span>}
                            </div>
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold text-gray-300">Remarks</label>
                            <textarea placeholder="Notes" className="
                                    border-1 
                                    border-gray-600 
                                        text-white
                                        bg-gray-800 
                                    px-2 py-1 
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

                            <button type="submit" 
                             disabled={submitBtnDisabled}
                             className="bg-blue-600
                                active:bg-blue-800
                                text-amber-50 
                                disabled:bg-blue-800
                                rounded-sm 
                                py-1
                                w-30
                                flex
                                gap-2
                                justify-center
                              ">
                                {submitBtnDisabled&&(
                                    <ImSpinner2  size={20} className="animate-spin"/>
                                )}
                                <span className="text-amber-50">{submitBtnDisabled?"Saving...":"Submit"}</span>
                            </button>

                            {submitError&&(
                                <p className="bg-red-600">{submitError}</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </>
    );
};

export default Add;