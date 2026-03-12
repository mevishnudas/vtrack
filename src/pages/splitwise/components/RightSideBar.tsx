import Transaction from "./transactions/Transactions";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import BarChart from './chart/BarChart';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { SimpleInput,SimpleTextArea } from "../../../components/formElements/SimpleInputs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImSpinner3 } from "react-icons/im";
import { useState,useEffect } from "react";

type RightSideBarProps = {
    selectedFriend:any[]
    friendTransitions:any[],
    friendTransitionLoading:boolean,
    //editTransaction:()=>void
};
const RightSideBar = ({selectedFriend,friendTransitions,friendTransitionLoading}:RightSideBarProps) =>{
    
    const [selectedTransaction,setSelectedTransaction] = useState([]);

    const FriendOwsStatus = ({friendInfo}:any) =>{
  
        switch (friendInfo.ows_status) {
            
            case "OWS_YOU":
                    return (<>
                                <h2 className="text-green-400"><label className="font-bold">{selectedFriend.name}</label> owes you</h2>
                                <h1 className="text-2xl font-bold text-green-400">₹ {Number(selectedFriend.balance).toLocaleString("en-IN")}</h1>
                            </>
                    );
                break;
                
                case "YOU_OWS":
                    return (<>
                                <h2 className="text-red-400">You ows <label className="font-bold">{selectedFriend.name}</label></h2>
                                <h1 className="text-2xl font-bold text-red-400">₹ {Number(selectedFriend.balance).toLocaleString("en-IN")}</h1>
                            </>
                    );
                break;

            default:
                   return (<>
                                <h2 className="text-blue-300 flex items-center gap-2"><label className="font-bold">{selectedFriend.name}</label> is Settled Up <AiOutlineCheckCircle /></h2>
                                <h1 className="text-2xl font-bold text-blue-300">₹ {Number(selectedFriend.balance).toLocaleString("en-IN")}</h1>
                            </>
                    );
                break;
        }
        
    }
    
    const GatheringData = () =>{
        return(
            <div className="flex justify-center h-10 gap-2 pt-2 text-gray-200 text-sm">
                <CgSpinnerTwoAlt size={20} className="animate-spin"/> Gathering data...
            </div>
        );
    }

    const TransactionList = () =>{
        return(
            <>
            {friendTransitionLoading&&(<GatheringData/>)}

            {friendTransitions.length==0&&!friendTransitionLoading&&(<p className="text-gray-400 text-center text-sm">No transactions found.</p>)}

            {friendTransitions.map((row)=>(
                <div key={row.id} className="cursor-pointer hover:bg-slate-800" onClick={()=>selectTransaction(row)}>
                    <Transaction key={row.id} info={row} selectedFriend={selectedFriend}/>
                </div>
            ))}
            </>
        );
    }

    const EditTransactionForm = () =>{
        return(
            <>
            <div className="pt-2 border-b-gray-800 border-b-1 rounded-sm p-2">
                <div>
                    <label className="text-sm text-gray-300">Amount</label>
                    <SimpleInput 
                        customClassName="border-2 border-slate-800 w-full" 
                        placeholder="Amount"
                        defaultValue={selectedTransaction.amount}
                    />
                </div>
                <div className="pt-2">
                    <label className="text-sm text-gray-300">Remarks</label>
                    <SimpleTextArea 
                        customClassName="border-2 border-slate-800 w-full p-2" 
                        placeholder="Remarks"
                        defaultValue={selectedTransaction.remarks}
                    />
                </div>

                <div className="pt-2 flex justify-between">
                    <div>
                        <button className="text-red-400 hover:text-red-500">
                            <RiDeleteBin6Line className="cursor-pointer"/>
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={()=>setSelectedTransaction([])} className="bg-gray-300 hover:bg-gray-400 rounded-sm px-2 text-black cursor-pointer">Cancel</button>
                        
                        <button className="bg-green-700 hover:bg-green-800 rounded-sm px-2 cursor-pointer flex justify-center items-center gap-2">
                            <ImSpinner3 className="animate-spin"/> Update
                        </button>

                    </div>
                </div>
            </div>
            </>
        );
    }

    const selectTransaction = (row) =>{
        setSelectedTransaction(row);
    }

    useEffect(()=>{
        //console.log(selectedTransaction);
        //setSelectedTransaction([]);
        //setSelectedTransaction([]);

        return () =>{
            setSelectedTransaction([]);
        }

    },[friendTransitions]);

    return(
        <>  
            <div>
            {selectedFriend.length!=0?(
                <div>
                    <h1 className="text-white uppercase">Your balance</h1>

                    {!friendTransitionLoading&&(
                    <div className="py-2 border-b border-b-gray-700">
                        <FriendOwsStatus friendInfo={selectedFriend}/>
                    </div>
                    )}

                    <div className="max-h-120 overflow-y-auto custom-overflow-track pr-1 pt-1">
                        
                        
                        {selectedTransaction?.id?(
                            <EditTransactionForm/>
                        ):(
                            <TransactionList/>
                        )}
                        

                    </div>
                </div>
            ):(<>
                {friendTransitionLoading?(<GatheringData/>):(<BarChart/>)}
               </>
            )}
            </div>
        </>
    );
};

export default RightSideBar;