import {useState,useEffect} from "react";
// import { Month } from "../../../../utils/Month";
// import {format} from "date-fns";
import { FaFilter } from "react-icons/fa";

import {SimpleButtonIconOnly,SimpleSelectMultiLabel,SimpleSelect} from "../../../../components/formElements/SimpleInputs";
import {fetchRequest} from "../../../../services/Fetch";
import {EmiDetailCard} from "../../../../components/cards/EmiDetailCard";

import { ImSpinner2 } from "react-icons/im";

type EmiListProps ={
    payee_list:any[],
    emi_status_list:any[],
    refresh:any[],
    selectedEmi:any
}
const EmiList = ({payee_list,emi_status_list,refresh,selectedEmi}:EmiListProps) =>{
    
    const [selectedEmiStatus,setSelectedEmiStatus] = useState("OPEN");
    const [selectedPayee,setSelectedPayee] = useState(0);

    const [emiList,setEmiList] = useState([]);
    const [loading,setLoading] = useState(false);

    const loadEmiList = async () =>{
        
        setLoading(true); //loading
        setEmiList([]);

        let response = await fetchRequest({
            path:"repayment/emi/list",
            auth:true,
            method:"POST",
            body:{
                    status:selectedEmiStatus,
                    payee:selectedPayee
                }
        });
    
        if(response.request){
            setEmiList(response.data?.data);
        }

        setLoading(false);
    } 

    useEffect(()=>{

        //Load EMI List
        loadEmiList();

        return ()=>{

        };

    },[refresh]);

    return( 
        <>  
            <div className="rounded-sm overflow-hidden">
                <div className="grid grid-cols-3 gap-1.5">
                    
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
                            name={"payee"} 
                              
                            value={selectedPayee}

                            optionList={payee_list} 
                            defaultLabel="All"

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
                
                <div className="py-2 px-1 mt-1 grid gap-3 max-h-180 overflow-y-auto custom-overflow-track">
                    
                    {loading&&(
                        <div className="flex justify-center items-center text-gray-200 gap-2">
                            <ImSpinner2 className="animate-spin"/> 
                            <span>Loading....</span>
                        </div>
                    )}
                    
                    {emiList.length==0&&loading==false?(
                        <>
                            <p className="text-center text-gray-200">No Data</p>
                        </>
                    ):(
                        
                        emiList.map((row,index)=>(
                            <EmiDetailCard 
                                key={index}
                                listData={row}
                                onClick={()=>selectedEmi(row)}
                            />
                        ))

                    )}

                </div>
                </div>
            </>
        );
};

export default EmiList;