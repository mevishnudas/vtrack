import Transaction from "./transactions/Transactions";
import { useEffect } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import BarChart from './chart/BarChart';
import { AiOutlineCheckCircle } from "react-icons/ai";

type RightSideBarProps = {
    selectedFriend:any[]
    friendTransitions:any[],
    friendTransitionLoading:boolean
};
const RightSideBar = ({selectedFriend,friendTransitions,friendTransitionLoading}:RightSideBarProps) =>{
    
    // useEffect(()=>{

    // },[selectedFriend]);
    const FriendOwsStatus = ({friendInfo}:any) =>{
        console.log(friendInfo);
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
                        

                        {friendTransitionLoading&&(
                            <div className="flex justify-center h-10 gap-2 pt-2 text-gray-200 text-sm">
                                <CgSpinnerTwoAlt size={20} className="animate-spin"/> Gathering data...
                            </div>
                        )}

                        {friendTransitions.length==0&&!friendTransitionLoading&&(<p className="text-gray-400 text-center text-sm">No transactions found.</p>)}

                        {friendTransitions.map((row)=>(
                            <Transaction key={row.id} info={row} selectedFriend={selectedFriend}/>
                        ))}
                    </div>
                </div>
            ):(<>
                 <BarChart/>
               </>
            )}
            </div>
        </>
    );
};

export default RightSideBar;