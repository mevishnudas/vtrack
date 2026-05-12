import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import { CgSpinner } from "react-icons/cg";

type ListProps = {
    expenseList:any[],
    expenseListLoading:boolean,
    setSelectedDate:Function,
    selectedDate:String,
    loadExpenses:Function,
    setExpenseListShowSkelton:Function,
    expenseListShowSkelton:Boolean,
    setSelectedExpense:Function
};

const List = ({expenseList,expenseListLoading,loadExpenses,setSelectedDate,selectedDate,setExpenseListShowSkelton,expenseListShowSkelton,setSelectedExpense}:ListProps) =>{

    type CardProps = {
        id:Number,
        title:String,
        amount:Number,
        notes:String,
        category_id:Number,
        category_name:String,
        transaction_date:Date,
        date:Date
    }

    const SkLayout = () => {
        return(
            <Skeleton 
                height={60} 
                baseColor="#2e375f" 
                highlightColor="#6d7cbd" 
                count={6}
            />
        )
    }

    const Card = ({title,notes,amount,category_name,date}:CardProps) =>{
        return(
            <>
            <div className="border-b-1 border-b-gray-800  hover:bg-gray-900 p-2">
                {/* <p className="text-white">List</p> */}
                <div className="grid grid-cols-4">
                    <div className="col-span-3 text-white">
                        <h1>{title}</h1>
                        <p>{notes}</p>
                    </div>
                    <div className="col-span-1 text-whit flex justify-end items-center">
                        <h1 className="text-end text-white text-xl font-bold">₹{Number(amount).toLocaleString("en-IN")}</h1>
                    </div>
                </div>

                <div className="grid grid-cols-4 pt-1">
                    <div className="flex col-span-3">
                        <label className="bg-yellow-100 px-2 rounded-2xl text-sm">{category_name}</label>
                    </div>
                    <div className="col-span-1"><p className="text-gray-500 text-end text-xs">{format(new Date(date),"h:I a | dd-MM-yyyy")}</p></div>
                </div>
                
            </div>
            </>
        )
    }   

    const dateChangeEvent = async (event:any) =>{
        //setExpenseListShowSkelton(true);
        loadExpenses({date:format(new Date(event.target.value),"yyyy-MM-dd")});
    }

    return(
        <>
            <div className="pt-2 flex justify-between">
                <div>
                    <p className="text-white pl-2"><label className="text-sm">Total : </label><label className="font-bold text-red-400">₹{expenseList.reduce((sum, item) => sum + Number(item.amount),0)}</label></p>
                </div>
                <div>
                <input 
                    type="date" 
                    className="text-white border-1 border-gray-500 rounded-sm date-input px-2"
                    value={selectedDate}

                    onChange={dateChangeEvent}
                />
                </div>
            </div>

            <div className="h-120 overflow-y-auto mt-2 rounded-xl min-h-100 border-1  border-gray-800 custom-overflow-track px-1">
                
                {expenseListLoading&&expenseListShowSkelton&&(
                    <>
                        <SkLayout/>
                    </>
                )}

                {expenseListLoading&&!expenseListShowSkelton&&(
                    <>
                    <div className="h-full flex justify-center items-center">
                        <p className="text-gray-400 text-sm text-center flex justify-center items-center gap-1">
                            <CgSpinner size={18} className="animate-spin"/> Gathering data...
                        </p>
                    </div>
                    </>
                )}

                {
                    !expenseListLoading&&expenseList.map((item)=>(
                        <div className="cursor-pointer" onClick={()=>setSelectedExpense(item)} key={item.id}>
                            <Card 
                                id={item.id}
                                title={item.title} 
                                amount={item.amount}
                                notes={item.notes}
                                category_id={item.category_id}
                                category_name={item.category_name}
                                transaction_date={item.transaction_date}
                                date={item.date}
                                />
                        </div>
                    ))
                }
                {expenseList.length==0&&!expenseListLoading&&(
                    <div className="h-full flex justify-center items-center">
                        <p className="text-gray-400 text-center">No Data</p>
                    </div>
                )}
                
            </div>
        </>
    );
};

export default List;