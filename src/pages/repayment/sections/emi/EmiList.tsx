
// import { Month } from "../../../../utils/Month";
// import {format} from "date-fns";
import { FaFilter } from "react-icons/fa";
import {SimpleButtonIconOnly,SimpleSelectMultiLabel,SimpleSelect} from "../../../../components/formElements/SimpleInputs";
import {EmiDetailCard} from "../../../../components/cards/EmiDetailCard";

import { CgSpinnerTwoAlt } from "react-icons/cg";

type EmiListProps ={
    payee_list:any[],
    emi_status_list:any[],
    bank_list:any[],

    emiList:any[],
    loading:any,
    
    selectedEmiStatus:any,
    setSelectedEmiStatus:Function

    selectedPayee:Number,
    setSelectedPayee:Function,

    selectedBank:Number,
    setSelectedBank:Function,

    selectedEmi:any,
    setSelectedEmi:Function,

    loadEmiList:Function
}
const EmiList = ({
        payee_list,
        emi_status_list,
        bank_list,

        emiList,
        loading,

        selectedEmiStatus,
        setSelectedEmiStatus,

        selectedPayee,
        setSelectedPayee,

        selectedBank,
        setSelectedBank,

        selectedEmi,
        setSelectedEmi,

        loadEmiList
    }:EmiListProps) =>{
    

    return( 
        <>  
            <div className="rounded-sm overflow-hidden">
                <div className="grid grid-cols-4 gap-1.5">
                    
                    <div>
                    <SimpleSelectMultiLabel 
                        name={"emi_status"} 
 
                        value={selectedEmiStatus}

                        optionList={emi_status_list} 
                        onChange={(e)=>setSelectedEmiStatus(e.target.value)}

                        customClassName="w-full"
                    />
                    </div>

                    <div>
                        <SimpleSelect 
                            name="from"
                              
                            value={selectedBank}

                            optionList={bank_list} 
                            defaultLabel="All"
                            defaultLabelValue="0"

                            onChange={(e)=>setSelectedBank(e.target.value)}

                            customClassName="w-full"
                        />
                    </div>

                    <div>
                        <SimpleSelect 
                            name={"payee"} 
                              
                            value={selectedPayee}

                            optionList={payee_list} 
                            defaultLabel="All"
                            defaultLabelValue="0"

                            onChange={(e)=>setSelectedPayee(e.target.value)}

                            customClassName="w-full"
                        />
                    </div>

                    <div className="flex justify-end">
                        <SimpleButtonIconOnly
                            icon={<FaFilter size={15}/>}

                            onClick={loadEmiList}
                            disabled={loading}
                            customclassname="w-10 h-full cursor-pointer"
                        />
                        
                    </div>

                </div>

                <div className="relative min-h-10">

                    {loading&&(
                        <div className="absolute w-full h-full flex justify-center items-center py-5 text-white text-shadow-gray-300 gap-2 bg-gray-950/30 text-sm z-10 cursor">
                            <CgSpinnerTwoAlt size={20} className="animate-spin"/>
                            <span>Syncing...</span>
                        </div>
                    )}    

                    <div className="py-2 px-1 mt-1 grid gap-3 max-h-180 overflow-y-auto custom-overflow-track">
                        
                        {emiList.length==0&&loading==false?(
                            <>
                                <p className="text-center text-gray-200">No Data</p>
                            </>
                        ):(
                            
                            emiList.map((row,index)=>(
                                <EmiDetailCard 
                                    key={index}
                                    listData={row}
                                    onClick={()=>setSelectedEmi(row)}
                                />
                            ))

                        )}

                    </div>

                </div>


                </div>
            </>
        );
};

export default EmiList;