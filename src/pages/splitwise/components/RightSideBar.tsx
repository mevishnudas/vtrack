import Transaction from "./transactions/Transactions";
import { useEffect } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

type RightSideBarProps = {
    selectedFriend:any[]
    friendTransitions:any[],
    friendTransitionLoading:boolean
};
const RightSideBar = ({selectedFriend,friendTransitions,friendTransitionLoading}:RightSideBarProps) =>{
  
    // useEffect(()=>{

    // },[selectedFriend]);

    return(
        <>  
            <div>
            {selectedFriend?(
                <div>
                    <h1 className="text-white uppercase">Your balance</h1>

                    <div className="py-2 border-b border-b-gray-700">
                        {selectedFriend.ows_you?(<>
                            <h2 className="text-green-400">{selectedFriend.name} owes you</h2>
                            <h1 className="text-2xl font-bold text-green-400">₹ {selectedFriend.balance.toLocaleString("en-IN")}</h1>
                        </>):(<>
                            <h2 className="text-red-400">{selectedFriend.name} owes you</h2>
                            <h1 className="text-2xl font-bold text-red-400">₹ {selectedFriend.balance.toLocaleString("en-IN")}</h1>
                        </>)}
                    </div>

                    <div className="max-h-120 overflow-y-auto custom-overflow-track pr-1 pt-1">
                        

                        {friendTransitionLoading&&(
                            <div className="flex justify-center gap-2 pt-2 text-gray-200 text-sm">
                                <CgSpinnerTwoAlt size={20} className="animate-spin"/> Gathering data...
                            </div>
                        )}

                        {friendTransitions.length==0&&!friendTransitionLoading&&(<p className="text-gray-400 text-center text-sm">No data.</p>)}

                        {friendTransitions.map((row)=>(
                            <Transaction key={row.id} info={row}/>
                        ))}
                    </div>
                </div>
            ):(
                <p className="text-center text-gray-400 text-sm">Transactions details show here</p>
            )}
            </div>
        </>
    );
};

export default RightSideBar;