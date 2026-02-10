import { useState,useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CgSpinnerTwoAlt } from "react-icons/cg";
type ExpenseListProps = {
    expenseListOwsYou:any[],
    expenseListYouOws:any[],
    //setSelectedFriend:(friend: any) => void
    loadFriendTransaction:(id:number,name:string)=>void,
    selectedFriend:any[],
    loadingExpenseSummary:boolean
}

const ExpenseList = ({expenseListOwsYou,expenseListYouOws,loadFriendTransaction,selectedFriend,loadingExpenseSummary}:ExpenseListProps) =>{

    type FriendBriefProps = {
        info:any,
        you_owe:boolean,
        onClick:()=>void
    };
    const FriendBrief = ({info,you_owe,...rest}:FriendBriefProps) =>{
        
        return(
            <div {...rest} 
                    className={`
                                ${selectedFriend?.id==info.id?"bg-slate-700":"bg-slate-800"}

                                hover:bg-slate-700 p-2 
                                flex 
                                cursor-pointer

                                rounded-sm
                                px-2
                                
                                `}>
                <div className="flex justify-center items-center">
                    <FaRegUserCircle size={30} />
                </div>

                <div className="px-2">
                    <h1 className="text-base font-bold">{info.name}</h1>

                    {you_owe?(
                        <h2 className="text-red-300 text-sm">you owe {Number(info.balance).toLocaleString("en-IN")}</h2>
                    ):(
                        <h2 className="text-green-300 text-sm">ows you {Number(info.balance).toLocaleString("en-IN")}</h2>
                    )}
                    
                </div>
            </div>
        );
    }

    return(
        <>
        <div className="grid grid-cols-2 gap-2 p-2">
                <div className="col-span-1 text-white border-r-1 border-r-gray-400 ">
                    <h1 className="uppercase text-sm">You owe</h1>

                    <div className="pt-2 grid gap-1 max-h-120 overflow-y-auto custom-overflow-track pr-2">
                        {loadingExpenseSummary&&(
                            <div className="flex justify-center h-10 gap-2 pt-2 text-gray-200 text-sm">
                                <CgSpinnerTwoAlt size={20} className="animate-spin"/>
                            </div>
                        )}

                        {expenseListYouOws.length==0&&!loadingExpenseSummary&&(<p className="text-gray-400 text-center text-sm">No Data.</p>)}
                        
                        {expenseListYouOws.map((row)=>(
                            <FriendBrief 
                                info={row} 
                                
                                onClick={()=>loadFriendTransaction({
                                    id:row.id,
                                    //name:row.name,
                                    //balance:row.balance,
                                    //ows_you:false
                                })} 
                                
                                key={row.id} 
                                you_owe={true}

                                />
                        ))} 
                    </div>

                </div>
                <div className="col-span-1 text-white">
                    <h1 className="uppercase text-end text-sm">You are owed</h1>

                    <div className="pt-2 grid gap-1 max-h-120 overflow-y-auto custom-overflow-track pr-2">
                        {loadingExpenseSummary&&(
                            <div className="flex justify-center h-10 gap-2 pt-2 text-gray-200 text-sm">
                                <CgSpinnerTwoAlt size={20} className="animate-spin"/>
                            </div>
                        )}
                        {expenseListOwsYou.length==0&&!loadingExpenseSummary&&(<p className="text-gray-400 text-center text-sm">No Data.</p>)}
                        {expenseListOwsYou.map((row)=>(
                            <FriendBrief 
                                info={row} 
                                
                                onClick={()=>loadFriendTransaction({
                                    id:row.id,
                                    name:row.name,
                                    balance:row.balance,
                                    ows_you:true
                                })} 
                                
                                key={row.id} 
                                you_owe={false}
                            />
                        ))}
                    </div>
                </div>
        </div>
        </>
    );
};

export default ExpenseList;