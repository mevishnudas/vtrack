import { useEffect, useState } from "react";
import { MdAccountBalance } from "react-icons/md";
import { format } from "date-fns";
import { IoIosEye,IoIosEyeOff } from "react-icons/io";
import Skeleton from 'react-loading-skeleton';
import { FaArrowTrendDown,FaArrowTrendUp } from "react-icons/fa6";
import { PiApproximateEqualsBold } from "react-icons/pi";

type AccountSummaryProps = {
  loading:boolean,
  accountSummary:any[]
}

const AccountSummary = ({loading, accountSummary}:AccountSummaryProps) => {
  const [showAmount,setShowAmount] = useState(false);
  const [totalAmount,setTotalAmount] = useState(0);
  const [totalAmountLastMonth,setTotalAmountLastMonth] = useState(0);

  type  SummaryProps = {
    bank_name: string,
    amount:number,
    last_month_balance:number
    last:boolean
  }
  const Summary = ({bank_name,amount,last_month_balance,last=false}:SummaryProps) =>{
    return(
      <>
      <div className={`text-sm flex justify-between text-white py-1 px-2 ${last ? '' : 'border-b-1 border-b-sky-950/60'}`}>
          <div>
            <h1 className="font-bold text-white text-shadow-gray-900">{bank_name}</h1>
            <h1 className="text-xs text-gray-300 text-shadow-gray-900 italic">Last Month</h1>
          </div>
          <div>
            <div className="flex gap-1 justify-center items-center">
              <label className="flex justify-end gap-1">
                ₹ {showAmount?(Number(amount).toLocaleString("en-IN")):(<>******</>)}
              </label>
              {amount==last_month_balance?(
                <>
                  <PiApproximateEqualsBold className="text-amber-300 font-bold" size={16} title="No Change"/>   
                </>
              ):(
                <>
                  {amount>last_month_balance?(<><FaArrowTrendUp className="text-green-300 font-bold" size={15} title="Up"/></>):(<><FaArrowTrendDown className="text-red-300 font-bold" size={16} title="Down"/></>)}
                </>
              )}
              
            </div>

            <label className="flex justify-end gap-1 text-xs text-gray-300">
              ₹ {showAmount?(Number(last_month_balance).toLocaleString("en-IN")):(<>******</>)}
            </label>
          </div>
      </div>
      </>
    )
  }

  const SK = () =>{
      return(
          <div className="px-2 pt-1">
              <Skeleton 
                  height={25} 
                  baseColor="#78fbf2" 
                  highlightColor="#ffffff" 
                  count={4}
              />
          </div>
      );
  }
  
  const calCulateTotal = () =>{
    
    let accounts = accountSummary?.accounts;
    let total = 0;
    let totalLastMonth = 0;

    accounts.map((item) => {
      total+=parseFloat(item.balance);
      totalLastMonth+=parseFloat(item.last_month_balance);
    });

    setTotalAmount(total);  
    setTotalAmountLastMonth(totalLastMonth);
  }

  useEffect(()=>{

    if(!loading)
    { calCulateTotal();}

  },[accountSummary]);

  return (
    <div className="bg-linear-to-b border-1 border-slate-800 from-lime-700 to-lime-900 rounded-xl overflow-hidden">

        <div className="text-center bg-lime-900 py-1 flex justify-between select-none">
          <div className="flex-1"><h1 className="text-white text-shadow-sm text-shadow-gray-800 flex justify-center items-center gap-2 select-none"><MdAccountBalance /> Account Summary </h1></div>
          <div onClick={()=>setShowAmount(!showAmount)} className="px-2 flex justify-center items-center text-white cursor-pointer">
            {showAmount?(<IoIosEye size={18}/>):(<IoIosEyeOff size={18}/>)}
          </div>
        </div>

        {loading?(<SK/>):(<>
          <p className="text-white text-xs flex justify-center pr-1 pt-1 italic">Last Synced : {accountSummary?.last_sync?format(new Date(accountSummary?.last_sync), "dd-MM-yyyy hh:mm a"):"Nill"}</p>
          <div>
            {accountSummary?.accounts?.map((row,index)=>(
                <Summary 
                  key={index} 
                  last={index === accountSummary.accounts.length - 1}
                  bank_name={row.name} 
                  amount={row.balance}
                  last_month_balance={row.last_month_balance}
                  />
            ))}
          </div>

          <div className="py-2 border-t-1 border-t-lime-900 bg-lime-950">
            <p className="flex text-end text-xs px-2 text-gray-300 justify-end gap-2">Total : ₹ {showAmount?Number(totalAmount).toLocaleString("en-IN"):"********"}

              {totalAmount==totalAmountLastMonth?(
                <>
                  <PiApproximateEqualsBold className="text-amber-300 font-bold" size={16} title="No Change"/>   
                </>
              ):(
                <>
                  {totalAmount>totalAmountLastMonth?(<><FaArrowTrendUp className="text-green-300 font-bold" size={15} title="Up"/></>):(<><FaArrowTrendDown className="text-red-300 font-bold" size={16} title="Down"/></>)}
                </>
              )}

            </p>
            <p className="text-end text-xs px-2 text-gray-300">Last Month : ₹ {showAmount?Number(totalAmountLastMonth).toLocaleString("en-IN"):"********"}</p>
          </div>
        </>)}

    </div>
  );
}

export default AccountSummary;