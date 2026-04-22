import { MdAccountBalance } from "react-icons/md";

const AccountSummary = () => {

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
          <div><label className="flex justify-center items-center gap-1">Rs.{Number(amount).toLocaleString("en-IN")}</label></div>
      </div>
      </>
    )
  }

  return (
    <div className="bg-linear-to-b border-1 border-slate-800 from-lime-700 to-lime-900 rounded-xl overflow-hidden pb-2">
        <h1 className="text-center text-white text-shadow-sm text-shadow-gray-800 bg-lime-900 py-1 flex justify-center items-center gap-2"><MdAccountBalance /> Account Summary</h1>
        <p className="text-white text-xs flex justify-center pr-1 pt-1">Last Synced : 22-04-2026</p>

        <div>
          <Summary bank_name="KGB" amount="700"/>
          <Summary last={true} bank_name="ICICI" amount="1200"/>
        </div>

    </div>
  );
}

export default AccountSummary;