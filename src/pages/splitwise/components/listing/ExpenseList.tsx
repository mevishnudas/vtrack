import { useState,useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";

type ExpenseListProps = {
    expenseListOwsYou:any[],
    expenseListYouOws:any[],
    //setSelectedFriend:(friend: any) => void
    loadFriendTransaction:(id:number,name:string)=>void,
    selectedFriend:any[]
}

const ExpenseList = ({expenseListOwsYou,expenseListYouOws,loadFriendTransaction,selectedFriend}:ExpenseListProps) =>{

    type FriendBriefProps = {
        info:any,
        you_owe:boolean,
        onClick:()=>void
    };
    const FriendBrief = ({info,you_owe,...rest}:FriendBriefProps) =>{
        
        return(
            <div {...rest} className="bg-slate-800 hover:bg-slate-700 p-2 flex cursor-pointer">
                <div className="flex justify-center items-center">
                    <FaRegUserCircle size={30} />
                </div>

                <div className="px-2">
                    <h1 className="text-base font-bold">{info.name}</h1>

                    {you_owe?(
                        <h2 className="text-red-300 text-sm">you owe {info.balance.toLocaleString("en-IN")}</h2>
                    ):(
                        <h2 className="text-green-300 text-sm">owe you {info.balance.toLocaleString("en-IN")}</h2>
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

                    <div className="pt-2 grid gap-1">
                        {expenseListYouOws.length==0&&(<p className="text-gray-400 text-center text-sm">You owe nothing to anyone.</p>)}
                        {expenseListYouOws.map((row)=>(
                            <FriendBrief 
                                info={row} 
                                
                                onClick={()=>loadFriendTransaction({
                                    id:row.id,
                                    name:row.name,
                                    balance:row.balance,
                                    ows_you:false
                                })} 
                                
                                key={row.id} 
                                you_owe={true}

                                />
                        ))} 
                    </div>

                </div>
                <div className="col-span-1 text-white">
                    <h1 className="uppercase text-end text-sm">You are owed</h1>

                    <div className="pt-2 grid gap-1">
                        {expenseListOwsYou.length==0&&(<p className="text-gray-400 text-center text-sm">No data.</p>)}
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