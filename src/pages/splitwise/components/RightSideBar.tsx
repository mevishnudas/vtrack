import Transaction from "./transactions/Transactions";
import { useEffect } from "react";

type RightSideBarProps = {
    selectedFriend:any[]
    friendTransitions:any[]
};
const RightSideBar = ({selectedFriend,friendTransitions}:RightSideBarProps) =>{
  
    useEffect(()=>{

    },[selectedFriend]);
    return(
        <>  
            <div>
            {selectedFriend?(
                <div>
                    <h1 className="text-white uppercase">Your balance</h1>

                    <div className="py-2 border-b border-b-gray-700">
                        <h2 className="text-green-400">{selectedFriend.name} owes you</h2>
                        <h1 className="text-2xl font-bold text-green-400">₹ 89</h1>
                    </div>

                    <div className="max-h-120 overflow-y-auto custom-overflow-track pr-1 pt-1">
                        {friendTransitions.map((row)=>(
                            <Transaction key={row.id} info={row}/>
                        ))}
                    </div>
                </div>
            ):(
                <p className="text-center text-gray-400 text-sm">Transction details show here</p>
            )}
            </div>
        </>
    );
};

export default RightSideBar;