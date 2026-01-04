import { useEffect, useState } from "react";
import {SimpleInput,SimpleSelectMultiLabel,SimpleSelectMultiLabel02,SimpleTextArea,} from "../../../../components/formElements/SimpleInputs";
import {CustomInput,CustomButton,CustomTextArea} from "../../../../components/formElements/input";
import {format} from "date-fns";
import { ImSpinner2 } from "react-icons/im";
import {toastSuccessBottomRight,toastErrorBottomRight} from "../../../../utils/Toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {error_message} from "../../../../utils/ErrorMessages";
import {fetchRequest} from "../../../../services/Fetch";

import EmiPrincipleAdd from "./components/EmiPrincipleAdd";
// import PrincipleCard from "./components/PrincipleCard";
import EmiPrincipleUpdate from "./components/EmiPrincipleUpdate";

import EmiSchedule from "./components/EmiSchedule";

const updateEMIStatusSchema = yup.object({
    remarks:yup.string().nullable(),
    paid: yup.number().typeError(error_message.required).integer().required(error_message.required),
    status: yup.string().required(error_message.required),
}).required();

type detailEmiProps ={
    emi_status_list:any[],
    emi_data:any[],
    emiPrincipleStatusList:any[],
    updateEMI:any
}
const DetailEmi = ({emi_status_list,emi_data,emiPrincipleStatusList,updateEMI}:detailEmiProps) =>{

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateEMIStatusSchema)
    });

    const [emiStatusUpdating,setEmiStatusUpdating] = useState(false);
    const [emiSchedule,setEmiSchedule] = useState([]);
    const [emiScheduleLoading,setEmiScheduleLoading] = useState(false);
    const [selectedEMIPrinciple,setSelectedEMIPrinciple] = useState([]);

    const updateEMIStatus = async (data) => { 
        setEmiStatusUpdating(true);
        updateEMI(data,emi_data.id);
        //setEmiStatusUpdating(false);
    }

    const addEmiPrinciple = async (data:any[],id:number) =>{

        let response = await fetchRequest({
            path:"repayment/emi/schedule/add",
            auth:true,
            method:"POST",
            body:{
                    id:id,
                    principle:data.principle,
                    amount:data.emi_amount,
                    payment_date:format(new Date(data.payment_date),"yyyy-MM-dd"),
                    remarks:data.remarks,
                }
        });
    
        if(response.request){
            //reload principle list
            loadEmiSchedule(emi_data);
            return true;
        }else{
            return false;
        }

    };
    
    const loadEmiSchedule = async (emi_data:any[]) =>{
        
        setSelectedEMIPrinciple([]);
        setEmiSchedule([]);
        setEmiScheduleLoading(true);
        let response = await fetchRequest({
            path:"repayment/emi/schedule/list",
            auth:true,
            method:"POST",
            body:{
                    id:emi_data.id
            }
        });
    
        if(response.request){
            setEmiSchedule(response.data?.data);
        }

        setEmiScheduleLoading(false);
    }  

    const updateEmiSchedule = async (data:any,id:number) =>{
        
        let response = await fetchRequest({
            path:"repayment/emi/schedule/update",
            auth:true,
            method:"POST",
            body:{
                    id:id,
                    status:data.payment_status,
                    remarks:data.remarks
            }
        });

        if(response.request){
            //reload principle list
            toastSuccessBottomRight({
                message:"Updated Successfully"
            });

            loadEmiSchedule(emi_data);

        }else{
            toastErrorBottomRight({
                message:"Unable to update !"
            });
        }

    }


    const EMIStatus = ({emi_status}:any) =>{

        switch(emi_status){

            case 'CLOSED':
                return <p className="font-bold text-green-700">Closed</p>;
            break;

            case 'PRE_CLOSED':
                return <p className="font-bold text-blue-600">Pre Closed</p>;
            break;

            default:
                return <p className="font-bold text-red-600">Open</p>;
            break;
        }

    }


    useEffect(()=>{

        setSelectedEMIPrinciple([]);
        reset();
        setValue("status",emi_data.status);
        setValue("paid",emi_data.paid);
        setValue("remarks",emi_data.remarks);
        loadEmiSchedule(emi_data);
        
        setEmiStatusUpdating(false);
        //console.log("EMI Detail",emi_data);
        //return
        return ()=>{

        }


    },[emi_data]);

    return(
        <>
            <div>
                <div className="bg-linear-to-b from-amber-200 to-amber-300 rounded-sm text-black">
                    
                    <div className="grid grid-cols-3 gap-1 px-3 py-2">
                        <div className="col-span-3"><label className="font-bold">{emi_data.payee}</label></div>
                        
                        <div className="grid grid-cols-2 col-span-2">
                            <div>
                                <label>Amount</label>
                                <p className="font-bold">Rs.{emi_data.amount.toLocaleString("en-IN")}</p>
                            </div>

                            <div>
                                <label>Pr.Fee</label>
                                <p className="font-bold">Rs.{emi_data.pr_fee.toLocaleString("en-IN")}</p>
                            </div>

                            <div>
                                <label>EMI ({emi_data.duration})</label>
                                <p><span className="font-bold">Rs.{emi_data.emi.toLocaleString("en-IN")}</span> + GST</p>
                            </div>
                            
                            <div>
                                <label>Paid</label>
                                <p className="font-bold">{emi_data.paid}</p>
                            </div>

                            <div>
                                <label>Status</label>
                                <EMIStatus emi_status={emi_data.status}/>
                            </div>
                        </div>
                        

                        <div className="col-span-1 border-l-1 border-l-amber-100 pl-2">
                            <div>
                                <label>Payment Date</label>
                                <p className="font-bold">{format(new Date(emi_data.payment_date),"dd MMM yyyy")}</p>
                            </div>

                            <div>
                                <label>Distributed Date</label>
                                <p className="font-bold">{format(new Date(emi_data.distributed_date),"dd MMM yyyy")}</p>
                            </div>
                            
                            <div>
                                <label>From</label>
                                <p className="font-bold">{emi_data.source}</p>
                            </div>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit(updateEMIStatus)}>
                        <div className=" grid grid-cols-3 gap-2 p-2 bg-amber-100">
                            <div className="col-span-3">
                                <CustomTextArea
                                    name="remarks"
                                    placeholder="Remarks"

                                    register={register}
                                    customClassName="w-full"
                                />
                                <p className="text-sm text-red-700">{errors.remarks?.message}</p>
                            </div>
                            <div className="col-span-1">
                                <CustomInput
                                    name="paid"
                                    placeholder="Paid"
                                    inputType="number"

                                    //defaultValue={emi_data.paid}

                                    register={register}
                                />
                                <p className="text-sm text-red-700">{errors.paid?.message}</p>
                                
                            </div>
                            <div>
                                <SimpleSelectMultiLabel
                                    name="status"
                                    optionList={emi_status_list}
                                    // value={currentEMIStatus}
                                    //onChange={(e)=>setValue("status",e.target.value)}
                                    customClassName="w-full"

                                    {...register("status")}
                                />
                                <p className="text-sm text-red-700">{errors.status?.message}</p>
                            </div>

                            <div className="h-8">
                                <button 
                                    className="bg-blue-600 disabled:bg-blue-900 px-4 py-1 text-white rounded-sm flex gap-2 justify-center items-center"
                                    type="submit"
                                    disabled={emiStatusUpdating}
                                >
                                    {emiStatusUpdating?(<>
                                        <span><ImSpinner2 size={20} className="animate-spin"/></span>
                                        <span>Updating...</span>
                                    </>):(<>
                                        <span>Update</span>
                                    </>)}

                                </button>
                            </div>

                        </div>
                    </form>

                </div>
                

                <div>
                    <EmiSchedule 
                        emiSchedule={emiSchedule} 
                        emi_data={emi_data}
                        emiScheduleLoading={emiScheduleLoading}
                        setSelectedEMIPrinciple={setSelectedEMIPrinciple}
                    />

                    {selectedEMIPrinciple.length==0?(
                        <EmiPrincipleAdd addEmiPrinciple={addEmiPrinciple} emi_data={emi_data}/> 
                    ):(
                        <EmiPrincipleUpdate 
                            selectedEMIPrinciple={selectedEMIPrinciple} 
                            emiPrincipleStatusList={emiPrincipleStatusList} 
                            setSelectedEMIPrinciple={setSelectedEMIPrinciple}
                            updateEmiSchedule={updateEmiSchedule}
                        />  
                    )}
                    
                </div>
                
            </div>
        </>
    )
};

export default DetailEmi;