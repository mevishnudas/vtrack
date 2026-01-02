import { useEffect } from "react";
import {SimpleInput,SimpleSelectMultiLabel,SimpleSelectMultiLabel02,SimpleTextArea,} from "../../../../components/formElements/SimpleInputs";
import {CustomInput,CustomButton} from "../../../../components/formElements/input";
import {format} from "date-fns";

type detailEmiProps ={
    emi_status_list:any[],
    emi_data:any[]
}
const DetailEmi = ({emi_status_list,emi_data}:detailEmiProps) =>{

    const paymentStatusList = [
    {
        label:"Pending",
        value:"PENDING"
    },{
        label:"Paid",
        value:"PAID"
    },
    {
        label:"Partially Paid",
        value:"PARTIALLY_PAID"
    }];

    const Principle = () =>{
        return(
            <div className="bg-red-100 rounded-sm text-black px-2 py-2">

                <div className="grid grid-cols-3">
                    <div>
                        <label><span className="font-bold">(1)</span> Principle</label>
                        <p>EMI (3/6) : <span className="font-bold">Rs.2,997</span></p>
                    </div>

                    <div>
                        <label>Payment Date</label>
                        <p className="font-bold">Jan 26 2025</p>
                    </div>
                    
                    <div>
                        <label>Payment Status</label>
                        <p className="font-bold">Pending</p>
                    </div>
                </div>

                <div className="">
                    <label className="text-sm font-bold">Remarks</label>
                    <p className="italic">testing.. dhf d fdf g dfnnwerwjr r ewjrjnjnn sdskdjbk</p>
                </div>
            </div>
        );
    }

    const EmiSchedule = () =>{
        return(
            <div>
                <div className="min-h-100 max-h-100 overflow-y-auto bg-slate-800 pt-3 pb-2 px-2 grid grid-cols-1 gap-2 auto-rows-min custom-overflow-track">

                    <Principle/>
                    <Principle/>
                    <Principle/>

                </div>

                {/* <div className="bg-blue-800 px-2 py-2 grid grid-cols-5 gap-2">
                    <div className="col-span-2">
                        <SimpleInput type="number" name="emi_amount" customClassName="bg-gray-100 text-black w-full" placeholder="EMI Amount"/>
                    </div>
                    <div className="col-span-2">
                        <SimpleTextArea
                            customClassName="bg-gray-100 text-black w-full h-8"
                            placeholder="Remarks"
                        />
                    </div>

                    <div className="col-span-1">
                        <CustomButton
                            type="submit"
                            label="Add"
                            customClassName="bg-gray-100 px-2 h-8 w-full text-blue-600"
                        />
                    </div>
                </div> */}

                <div className="bg-amber-800 px-2 py-2 grid grid-cols-5 gap-2">
                    <div className="col-span-5 flex justify-between">
                        <div>
                            Amount : <span className="font-bold">Rs.2,997</span>
                        </div>
                        <div><span className="text-sm cursor-pointer">Cancel</span></div>
                    </div>

                    <div className="col-span-2">
                        <SimpleSelectMultiLabel02
                            name="payment_status"
                            optionList={paymentStatusList}

                            customClassName={"w-full border-gray-100 text-black bg-gray-100"}
                        />
                    </div>
                    <div className="col-span-2">
                        <SimpleTextArea
                            customClassName="bg-gray-100 text-black w-full h-8"
                            placeholder="Remarks"
                        />
                    </div>

                    <div className="col-span-1">
                        <CustomButton
                            type="submit"
                            label="Update"
                            customClassName="bg-gray-100 px-2 h-8 w-full text-blue-600"
                        />
                    </div>
                </div>

            </div>
        );
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

    const NoData = () =>{
        return(
            <div className="bg-slate-900 rounded-sm border-1 border-slate-800 py-2">
                <p className="text-center text-slate-200">Selected data appears here.</p>
            </div>
        );
    }

    useEffect(()=>{

        console.log("EMI Detail",emi_data);

        //return
        return ()=>{

        }


    },[emi_data]);

    return(
        <>
            <div>
                {emi_data.length==0?(
                    <NoData/>
                ):(
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
                            
                            <div className=" grid grid-cols-3 gap-2 p-2 bg-amber-100">
                                <div>
                                    <CustomInput
                                        name="paid"
                                        placeholder="Paid"
                                        inputType="number"

                                        defaultValue={emi_data.paid}
                                    />
                                </div>
                                <div>
                                    <SimpleSelectMultiLabel
                                        name="status"
                                        optionList={emi_status_list}
                                        // value={emi_data.status}
                                        defaultValue={emi_data.status}
                                        customClassName="w-full"
                                    />
                                </div>
                                <div className="flex justify-center items-center">
                                    <CustomButton 
                                        label="Update" 
                                        type="submit"
                                        customClassName="bg-blue-600 px-4 py-1 text-white"
                                    />
                                </div>
                            </div>

                        </div>

                        <EmiSchedule/>
                        
                    </div>
                )} 

            </div>
        </>
    )
};

export default DetailEmi;