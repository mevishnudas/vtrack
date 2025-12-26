import { useEffect, useState } from "react";
import {CustomSelect,CustomInput,CustomTextArea,CustomButton} from "../../../components/formElements/input";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer, toast,Bounce } from 'react-toastify';

import {error_message} from "../../../utils/ErrorMessages";
import {fetchRequest} from "../../../services/Fetch";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { format } from "date-fns";

const validationSchema = yup.object({
  payment_status: yup.string().required(error_message.required),
  from:yup.number().required(error_message.required),
  amount:yup.number().required(error_message.required),
  pr_fee:yup.number().required(error_message.required),
  charges:yup.number().required(error_message.required),

  distributed_date:yup.date().typeError(error_message.invalid_date).required(error_message.required),
  payment_date:yup.date().typeError(error_message.invalid_date).required(error_message.required),

  remarks:yup.string()
})

type updateProps = {
    selectedPaymentDetail:any[],
    bankList:any[],
    paymentList:any[],
    refreshList:any
};

type PaymentInfo  = {
    id:number,
    amount:number,
    pr_fee:number,
    charges:number,
    remarks:string,
    from:number,
    payment_status:string,
    payment_date:string,
    distributed_date:string
};

const Update = ({selectedPaymentDetail,bankList,paymentList,refreshList}:updateProps) =>{
    
    const [paymentInfo,setPaymentInfo] = useState<PaymentInfo>([]);
    const [updating,setUpdating] = useState(false);
    const [updateError,setUpdateError] = useState("");
    const [totalAmount,setTotalAmount] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues:{
            //payee:0
        },
        resolver: yupResolver(validationSchema)
    });
 

    const onSubmit = async (data:any) =>{
        //alert("Hi");
        setUpdateError("");
        setUpdating(true);

        let elements = {
            record_id:paymentInfo.id,
            amount:data.amount,
            pr_fee:data.pr_fee,
            charges:data.charges,
            payment_date:format(new Date(data.payment_date), "Y-MM-dd"),
            distributed_date:format(new Date(data.distributed_date), "Y-MM-dd"),
            remarks:data?.remarks,
            from:data.from,
            payment_status:data.payment_status,
        };

        let params = {
            path:"repayment/update",
            method:"POST",
            auth:true,
            body:elements
        };
        //console.log(elements);
        let response = await fetchRequest(params);
        setUpdating(false);

        if(response.request){
            //reset form
            toast.success('Updated Successfully', {
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
            
            reset();
            setPaymentInfo([]);
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

            setUpdateError(error_message.submit_error);
        }

    }

    const reCalcTotal = (event) =>{
        let amount = parseFloat(getValues("amount"))||0;
        let pr_fee = parseFloat(getValues("pr_fee"))||0;
        let charges = parseFloat(getValues("charges"))||0;
        setTotalAmount(amount+pr_fee+charges);
    }

    useEffect(()=>{
        
        setPaymentInfo(selectedPaymentDetail);
        setTotalAmount(selectedPaymentDetail.total);
        reset();
            
    },[selectedPaymentDetail]);

    return(
        <>  
            {paymentInfo.length===0?(
                <>  
                    <div className="bg-gray-800 border-1 border-gray-700 rounded-sm px-2 py-2">

                        <div className="min-h-80 flex items-center justify-center">
                            <p className="text-center text-sm text-gray-400">Click the list to update the record.</p>
                        </div>
                    
                    </div>
                </>
            ):(
                <>
                    <div className="bg-slate-900 border-1 border-gray-700 rounded-sm">
                        <h1 className="font-bold bg-orange-700 text-gray-50 px-4 py-1">Update Record</h1>
                        
                        <div className="px-4 py-2">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-rows-4 grid-cols-2 gap-2">

                                    <div className="col-span-1">
                                        <label className="text-white font-bold">Payment Status</label>
                                        <CustomSelect
                                            name="payment_status"
                                            label="Choose Option"
                                            optionsList={paymentList}
                                            defaultValue={paymentInfo.payment_status}
                                            
                                            register={register}
                                            customClassName="w-full"
                                        />
                                        {errors.payment_status && <span className="text-red-300">{errors.payment_status?.message}</span>}
                                    </div>

                                    <div className="col-span-1">
                                        <label className="text-white font-bold">From</label>
                                        <CustomSelect
                                            name="from"
                                            label="Choose Option"
                                            optionsList={bankList}

                                            defaultValue={paymentInfo.from_id}
                                            //defaultValue={0}
                                            register={register}

                                            customClassName="w-full"
                                        />
                                        {errors.from && <span className="text-red-300">{errors.from?.message}</span>}
                                    </div>
                                    
                                    <div className="col-span-1">
                                        <label className="text-white font-bold">Amount</label>
                                        <CustomInput
                                            name="amount"
                                            placeholder="Amount"
                                            inputType={"number"}
                                            
                                            onValueChange={reCalcTotal}
                                            defaultValue={paymentInfo.amount}
                                            // value={paymentInfo.amount}

                                            register={register}
                                        />
                                        {errors.amount && <span className="text-red-300">{errors.amount?.message}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-white font-bold">Pr.Fee</label>
                                        <CustomInput
                                            name="pr_fee"
                                            placeholder="Pr.Fee"
                                            inputType={"number"}

                                            onValueChange={reCalcTotal}
                                            defaultValue={paymentInfo.pr_fee}

                                            register={register}
                                        />
                                        {errors.pr_fee && <span className="text-red-300">{errors.pr_fee?.message}</span>}
                                    </div>

                                    <div className="col-span-1">
                                        <label className="text-white font-bold">Charges</label>
                                        <CustomInput
                                            name="charges"
                                            placeholder="Charges"
                                            inputType={"number"}
                                            
                                            onValueChange={reCalcTotal}
                                            defaultValue={paymentInfo.charges}

                                            register={register}
                                        />
                                        {errors.charges && <span className="text-red-300">{errors.charges?.message}</span>}
                                    </div>

                                    <div className="col-span-1">
                                        <label className="text-white font-bold">Total</label>
                                        <p className="border-1 px-2 py-1 rounded-sm 

                                                    border-gray-500 
                                                    text-white
                                                    bg-gray-600 
                                    
                                    ">{totalAmount?.toLocaleString("en-IN")}</p>
                                    </div>

                                    <div className="col-span-1">
                                        <label className="text-white font-bold">Distributed Date</label>
                                        <CustomInput
                                            name="distributed_date"
                                            inputType={"date"}

                                            register={register}
                                            defaultValue={paymentInfo.distributed_date}
                                        />
                                        {errors.distributed_date && <span className="text-red-300">{errors.distributed_date?.message}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-white font-bold">Payment Date</label>
                                        <CustomInput
                                            name="payment_date"
                                            inputType={"date"}
                                            
                                            register={register}
                                            defaultValue={paymentInfo.payment_date}
                                        />
                                        {errors.payment_date && <span className="text-red-300">{errors.payment_date?.message}</span>}
                                    </div>

                                    <div className="col-span-2">
                                        <label className="text-white font-bold w-full">Remarks</label>
                                        <CustomTextArea
                                            name="remarks"
                                            customClassName="w-full"

                                            register={register}
                                            defaultValue={paymentInfo.remarks}
                                            
                                        />
                                        {errors.remarks && <span className="text-red-300">{errors.remarks?.message}</span>}
                                    </div>

                                </div>

                                {/* Button Area  */}
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    <div>
                                        <button type="submit" 
                                                
                                                disabled={updating}
                                                className="bg-green-600 disabled:bg-green-800 text-white w-full h-8 rounded-sm flex justify-center items-center">
                                                {updating?(
                                                    <>
                                                        <ImSpinner2 size={20} className="animate-spin"/>&nbsp;Updating...
                                                    </>
                                                ):(
                                                    <>
                                                        Update
                                                    </>
                                                )}
                                                
                                        </button>
                                        
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            disabled={updating}
                                            className="bg-red-700 disabled:bg-red-900 text-white w-20 rounded-sm h-8"
                                        >
                                            Delete
                                        </button> 
                                    </div>
                                </div>
                                {/* Button Area Ends */}

                                {updateError&&(<p className="text-red-400">{updateError}</p>)}
                            </form>
                        </div>

                    </div>
                </>
            )}
        </>
    );

};

export default Update;