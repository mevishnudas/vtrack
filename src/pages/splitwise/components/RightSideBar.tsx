import Transaction from "./transactions/Transactions";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import BarChart from './chart/BarChart';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState,useEffect } from "react";
import EditTransactionForm from "./transactions/EditTransactionForm";

type RightSideBarProps = {
    selectedFriend:any[]
    friendTransitions:any[],
    friendTransitionLoading:boolean,
    refreshExpenseList:Function
    //editTransaction:()=>void
};
const RightSideBar = ({selectedFriend,friendTransitions,friendTransitionLoading,refreshExpenseList}:RightSideBarProps) =>{
    
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
            {friendTransitions.length==0&&!friendTransitionLoading&&(<p className="text-gray-400 text-center text-sm">No transactions found.</p>)}

            {friendTransitions.map((row)=>(
                <div key={row.id} 
                    className={`${row.edit&&('cursor-pointer')} hover:bg-slate-800`} 
                    onClick={()=>selectTransaction(row)}
                >
                    <Transaction key={row.id} info={row} selectedFriend={selectedFriend}/>
                </div>
            ))}
            </>
        );
    }


    const selectTransaction = (row) =>{
        if(!row.edit){
            return false;
        }
        setSelectedTransaction(row);
    }

    useEffect(()=>{

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
                        
                        {friendTransitionLoading&&(<GatheringData/>)}

                        {selectedTransaction?.id&&!friendTransitionLoading?(
                            <EditTransactionForm 
                                selectedTransaction={selectedTransaction}
                                setSelectedTransaction={setSelectedTransaction}
                                refreshExpenseList={refreshExpenseList}
                             />
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