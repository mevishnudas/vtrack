import { SlCalender } from "react-icons/sl";
import { GiOpenChest } from "react-icons/gi";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaCheckDouble } from "react-icons/fa6";

const Emi = () =>{
    
    type EmiDetailsProps = {
        title:string,
        opened:number,
        closed:number,
        pre_closed:number,
        border:boolean
    }
    const EmiDetails = ({title,opened,closed,pre_closed,border=true}) =>{
        return(
            <div className={`px-2 pb-2 ${border?"border-b-1":"border-b-0"} border-b-teal-900`}>
                <h1 className="font-bold text-white text-shadow-gray-900">{title}</h1>
                <div className="text-sm flex justify-between text-white">
                    <label className="flex justify-center items-center gap-1"><GiOpenChest size={12}/> Opened ({opened})</label>
                    <label className="flex justify-center items-center gap-1"><FaCheckDouble size={12}/> Closed ({closed})</label>
                    <label className="flex justify-center items-center gap-1"><GiCardboardBoxClosed size={12}/>Pre Closed ({pre_closed})</label>
                </div>
            </div>
        )
    }
    return(
        <>
        <div className="bg-linear-to-b border-1 border-slate-800 from-teal-700 to-teal-800 rounded-xl overflow-hidden pb-2">
            <h1 className="text-center text-white text-shadow-sm text-shadow-gray-800 bg-teal-900 py-1 flex justify-center items-center gap-2"><SlCalender /> EMI</h1>
            <EmiDetails title="This Month" opened="2" closed="1" pre_closed="3"/>
            <EmiDetails title="Last Month" opened="3" closed="2" pre_closed="1" border={false}/>
        </div>
        </>
    );
};

export default Emi;