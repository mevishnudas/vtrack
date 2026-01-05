import { CgSpinnerTwoAlt } from "react-icons/cg";
import PrincipleCard from "./PrincipleCard";
import EmiPrincipleAdd from "./EmiPrincipleAdd";

type EmiScheduleProps = {
    emiSchedule:any[],
    emi_data:any[],
    emiScheduleLoading:boolean,
    setSelectedEMIPrinciple:any
};
const EmiSchedule = ({emiSchedule,emi_data,emiScheduleLoading,setSelectedEMIPrinciple}:EmiScheduleProps) =>{

        return(
                <div className="min-h-100 max-h-100 overflow-y-auto bg-slate-800 pt-3 pb-2 px-2 grid grid-cols-1 gap-2 auto-rows-min custom-overflow-track">
                    
                    {emiScheduleLoading&&(<>
                        <div className="text-gray-400 flex justify-center items-center gap-2"><CgSpinnerTwoAlt size={20} className="animate-spin"/> <span>Loading...</span></div>
                    </>)}
                    
                    {emiScheduleLoading==false&&emiSchedule.length==0&&(
                        <p className="text-gray-400 text-center">No Data</p>
                    )}
                    
                    {emiSchedule.map((row,i)=>(
                        <PrincipleCard 
                            key={row.id} 
                            payee={emi_data.payee} 
                            duration={emi_data.duration} 
                            index={i+1} 
                            data={row}

                            onClick={()=>setSelectedEMIPrinciple(row)}
                        />
                    ))}
                    
                </div>
        );
}

export default EmiSchedule;