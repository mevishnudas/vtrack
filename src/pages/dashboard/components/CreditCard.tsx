import { FaRegCreditCard } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import { FaLongArrowAltUp,FaLongArrowAltDown,FaArrowsAltV   } from "react-icons/fa";
type CreditCardProps = {
    creditCardSummary:any[],
    loading:boolean
}


const CreditCard = ({creditCardSummary,loading}:CreditCardProps) =>{

    const SK = () =>{
        return(
            <div className="px-2 pt-1">
                <Skeleton 
                    height={20} 
                    baseColor="#a8a3ff" 
                    highlightColor="#ffffff" 
                    count={3}
                    borderRadius={10}

                />
            </div>
        );
    }  
    
    type SummaryArrowProps = {
        current:Number,
        previous:Number
    }
    
    const SummaryArrow = ({current,previous}:SummaryArrowProps) =>{

        if(current>previous){
            return <FaLongArrowAltUp className="text-red-600" size={20}/>  
        }else if(current<previous){
            return <FaLongArrowAltDown className="text-green-600" size={20}/>
        }else{
            return <FaArrowsAltV className="text-amber-400" size={20}/>
        }   
    }   

    return(
        <div className="bg-linear-to-b border-1 border-slate-800 from-indigo-900 to-indigo-950 p-2 rounded-xl overflow-hidden">
            <h1 className="text-center text-white text-shadow-sm text-shadow-gray-800 flex justify-center items-center gap-2"><FaRegCreditCard /> Credit Card Summary</h1>
            
            {loading?(<SK/>):(<>
                <h2 className="text-white text-center text-xl font-bold">₹ {Number(creditCardSummary?.total_amount_due).toLocaleString("en-IN")}</h2>
                <p className="text-white text-center text-xs italic">Total Amount Due</p>

                <div className="text-center text-white flex justify-center items-center pointer-events-none pt-2">
                    <label>₹{Number(creditCardSummary?.prev_month_bill).toLocaleString("en-IN")}</label>
                    <label className="text-xs italic" title="Previous">&nbsp;(Prev.)</label>
                    &nbsp;|&nbsp; 
                    <label>₹{Number(creditCardSummary?.current_bill).toLocaleString("en-IN")}</label>
                    <label className="text-xs italic" title="Latest">&nbsp;(Lat.)</label>
                    <SummaryArrow 
                        current={Number(creditCardSummary?.current_bill)} 
                        previous={Number(creditCardSummary?.prev_month_bill)} 
                    />
                </div>
                <p className="text-white text-center text-xs">Total Cards ( {creditCardSummary?.total_cards} )</p>
            </>)}
            

        </div>
    );
}
export default CreditCard;