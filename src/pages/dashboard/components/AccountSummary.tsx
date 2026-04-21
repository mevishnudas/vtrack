import { MdAccountBalance } from "react-icons/md";

const AccountSummary = () => {
  return (
    <div className="bg-linear-to-b border-1 border-slate-800 from-sky-700 to-sky-900 rounded-xl overflow-hidden pb-2">
        <h1 className="text-center text-white text-shadow-sm text-shadow-gray-800 bg-sky-700 py-1 flex justify-center items-center gap-2"><MdAccountBalance /> Account Summary</h1>
        
        <h1 className="font-bold text-white text-shadow-gray-900"></h1>
        <div className="text-sm flex justify-between text-white">
            <label className="flex justify-center items-center gap-1"><GiOpenChest size={12}/> Opened ({opened})</label>
            <label className="flex justify-center items-center gap-1"><FaCheckDouble size={12}/> Closed ({closed})</label>
            <label className="flex justify-center items-center gap-1"><GiCardboardBoxClosed size={12}/>Pre Closed ({pre_closed})</label>
        </div>
    </div>
  );
}

export default AccountSummary;