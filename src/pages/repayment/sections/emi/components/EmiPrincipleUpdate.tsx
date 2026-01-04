import { useEffect,useState } from "react";
import {SimpleInput,SimpleSelectMultiLabel,SimpleSelectMultiLabel02,SimpleTextArea,} from "../../../../../components/formElements/SimpleInputs";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ImSpinner2 } from "react-icons/im";

import { error_message } from "../../../../../utils/ErrorMessages";

const validationSchema = yup
  .object({
    payment_status: yup.string().required(error_message.required),
    remarks: yup.string().nullable(),
  })
  .required();

type EmiPrincipleUpdateProps = {
    emiPrincipleStatusList:any[],
    setSelectedEMIPrinciple:any,
    selectedEMIPrinciple:any[],
    updateEmiSchedule:any
};
const EmiPrincipleUpdate = ({emiPrincipleStatusList,setSelectedEMIPrinciple,selectedEMIPrinciple,updateEmiSchedule}:EmiPrincipleUpdateProps) =>{

      const {
            register,
            handleSubmit,
            setValue,
            getValues,
            reset,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(validationSchema),
      });

      const [submitting,setSubmitting] = useState(false);

      const onSubmit = async (data) =>{
        setSubmitting(true);
            await updateEmiSchedule(data,selectedEMIPrinciple.id);
        setSubmitting(false);
      }

      useEffect(()=>{
        setValue("payment_status",selectedEMIPrinciple?.payment_status);
        setValue("remarks",selectedEMIPrinciple?.remarks);

      },[selectedEMIPrinciple]);
      
      return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-amber-800 px-2 py-2 grid grid-cols-5 gap-2">
                        
                            <div className="col-span-5 flex justify-between">
                                <div>
                                    Amount : <span className="font-bold">Rs.{selectedEMIPrinciple?.amount.toLocaleString("en-IN")}</span>
                                </div>
                                <div><button onClick={()=>setSelectedEMIPrinciple([])} className="text-sm cursor-pointer">Cancel</button></div>
                            </div>
                            
                            <div className="col-span-2">
                                <SimpleSelectMultiLabel02
                                    optionList={emiPrincipleStatusList}

                                    {...register("payment_status")}

                                    
                                    customClassName={"w-full border-gray-100 text-black bg-gray-100"}
                                />
                                <p className="text-sm text-red-200">{errors.payment_status?.message}</p>
                            </div>
                            
                            <div className="col-span-2">
                                <SimpleTextArea
                                    customClassName="bg-gray-100 text-black w-full h-8"
                                    placeholder="Remarks"

                                    {...register("remarks")}
                                />
                            </div>

                            <div className="col-span-1">
                                <button type="submit" 
                                    disabled={submitting}
                                    className="bg-gray-100 px-2 h-8 w-full text-blue-600 rounded-sm flex items-center justify-center gap-1"
                                >
                                    {submitting?(<>
                                        <ImSpinner2 className="animate-spin"/> Updating...   
                                    </>):(<>
                                        Update
                                    </>)}
                                    
                                
                                </button>
                            </div>
                </div>
            </form>
        );
    };

export default EmiPrincipleUpdate;