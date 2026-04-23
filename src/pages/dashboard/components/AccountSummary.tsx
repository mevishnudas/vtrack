import { useState } from "react";
import { MdAccountBalance } from "react-icons/md";
import { format } from "date-fns";
import { IoIosEye,IoIosEyeOff } from "react-icons/io";
import Skeleton from 'react-loading-skeleton';

type AccountSummaryProps = {
  loading:boolean,
  accountSummary:any[]
}

const AccountSummary = ({loading, accountSummary}:AccountSummaryProps) => {
  const [showAmount,setShowAmount] = useState(false);

  type  SummaryProps = {
    bank_name: string,
    amount:number,
    last:boolean
  }
  const Summary = ({bank_name,amount,last=false}:SummaryProps) =>{
    return(
      <>
      <div className={`text-sm flex justify-between text-white py-1 px-2 ${last ? '' : 'border-b-1 border-b-sky-950/60'}`}>
          <div><h1 className="font-bold text-white text-shadow-gray-900">{bank_name}</h1></div>
          <div>
            <label className="flex justify-center items-center gap-1">
              ₹ {showAmount?(Number(amount).toLocaleString("en-IN")):(<>******</>)}
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
  
  return (
    <div className="bg-linear-to-b border-1 border-slate-800 from-lime-700 to-lime-900 rounded-xl overflow-hidden pb-2">

        <div className="text-center bg-lime-900 py-1 flex justify-between">
          <div className="flex-1"><h1 className="text-white text-shadow-sm text-shadow-gray-800 flex justify-center items-center gap-2 select-none"><MdAccountBalance /> Account Summary </h1></div>
          <div onClick={()=>setShowAmount(!showAmount)} className="px-2 flex justify-center items-center text-white cursor-pointer">
            {showAmount?(<IoIosEye size={18}/>):(<IoIosEyeOff size={18}/>)}
          </div>
        </div>

        {loading?(<SK/>):(<>
          <p className="text-white text-xs flex justify-center pr-1 pt-1 select-none">Last Synced : {accountSummary?.last_sync?format(new Date(accountSummary?.last_sync), "dd-MMM-yyyy"):"Nill"}</p>
          <div>
            {accountSummary?.accounts?.map((row,index)=>(<>
                <Summary key={index} last={index === accountSummary.accounts.length - 1} bank_name={row.name} amount={row.balance}/>
            </>))}
          </div>
        </>)}

    </div>
  );
}

export default AccountSummary;