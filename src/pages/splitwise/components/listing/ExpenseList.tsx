import { FaRegUserCircle } from "react-icons/fa";

const ExpenseList = () =>{

    type FriendBriefProps = {
        info:any,
        you_owe:boolean
    };
    const FriendBrief = ({info,you_owe}:FriendBriefProps) =>{
        return(
            <div className="bg-slate-800 hover:bg-slate-700 p-2 flex cursor-pointer">
                <div className="flex justify-center items-center">
                    <FaRegUserCircle size={30} />
                </div>

                <div className="px-2">
                    <h1 className="text-base font-bold">{info.name}</h1>

                    {you_owe?(
                        <h2 className="text-red-300 text-sm">you owe Rs.85</h2>
                    ):(
                        <h2 className="text-green-300 text-sm">owe you Rs.85</h2>
                    )}
                    
                </div>
            </div>
        );
    }
    
    const splitListYouOwe = [{
        name:"Vishnu Gopalan"
    }
    ];

    const splitListYouAreOwe = [
    {
        name:"Abhinad PS"
    },
    {
        name:"Albin Popular"
    }
    ];

    return(
        <>
        <div className="grid grid-cols-2 gap-2 p-2">
                <div className="col-span-1 text-white border-r-1 border-r-gray-400 ">
                    <h1 className="uppercase text-sm">You owe</h1>

                    <div className="pt-2 grid gap-1">
                        {splitListYouOwe.map((row)=>(
                            <FriendBrief info={row} you_owe={true}/>
                        ))}
                    </div>

                </div>
                <div className="col-span-1 text-white">
                    <h1 className="uppercase text-end text-sm">You are owed</h1>

                    <div className="pt-2 grid gap-1">
                        {splitListYouAreOwe.map((row)=>(
                            <FriendBrief info={row} you_owe={false}/>
                        ))}
                    </div>
                </div>
        </div>
        </>
    );
};

export default ExpenseList;