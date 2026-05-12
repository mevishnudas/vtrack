import { useEffect, useState } from "react";
import PageTitle from "../../utils/PageTitle";
import Overview from "./components/Overview";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDataset } from "react-icons/md";
import List from "./components/List";
import Category  from "./components/Category";
import AddExpense from "./components/AddExpense";
import UpdateExpense from "./components/UpdateExpense";
import { fetchRequest } from "../../services/Fetch";
import { format } from "date-fns";

const Expenses = () =>{
    const[manageState,setManageState] = useState("ADD");
    const[selectedDate,setSelectedDate] = useState(format(new Date(),"yyyy-MM-dd"));

    const [overViewData,setOverViewData] = useState([]);
    const [overViewLoading,setOverViewLoading] = useState(true);
    const [overViewShowSkeleton,setOverViewShowSkeleton] = useState(true);

    const [categoryList,setCategoryList] = useState([]);
    const [categoryListLoading,setCategoryListLoading] = useState(true);
    
    const [expenseList,setExpenseList] = useState([]);
    const [expenseListShowSkelton,setExpenseListShowSkelton] = useState(true);
    const [expenseListLoading,setExpenseListLoading] = useState(true);

    const [selectedExpense,setSelectedExpense] = useState();

    const switchManage = (manage:string) =>{
        setManageState(manage);
    }

    const loadCategory = async () =>{

        let response = await fetchRequest({
            path:"expense/category/list",
            method:"GET",
            auth:true
        });

        if(response.request){
            //console.log(response.data?.data);
            setCategoryList(response.data?.data);
            setCategoryListLoading(false);
        }
    };

    type loadExpensesProps = {
        date:String,
        showLoading?:Boolean
    }

    const loadExpenses = async ({date,showLoading=true}:loadExpensesProps) =>{

        setExpenseListLoading(showLoading); 

        let response = await fetchRequest({
            path:"expense/list",
            method:"POST",
            body:{
                date:date
            },
            auth:true
        });
        
        setSelectedDate(date);

        if(response.request){
            setExpenseList(response.data?.data);
        }

        setExpenseListLoading(false);
        setExpenseListShowSkelton(false);
    }

    const loadOverView = async () =>{

        setOverViewLoading(true);
        let response = await fetchRequest({
            path:"expense/overview",
            method:"GET",
            auth:true
        });

        if(response.request){
            setOverViewData(response.data?.data);
        }

        setOverViewLoading(false);
        setOverViewShowSkeleton(false);
    }

    const loadBasic = async () =>{
        loadCategory();
        loadExpenses({date:selectedDate});
        loadOverView();
    }

    useEffect(()=>{
        loadBasic();
    },[]);

    return(
        <>
            <PageTitle pageName="Expenses"/>
            <div className="p-2">
                <h1 className="font-bold text-white">Expenses</h1>

                <div className="grid grid-cols-3 pt-2">
                    <div className="col-span-2">
                        <Overview 
                            overViewData={overViewData}
                            overViewLoading={overViewLoading}
                            overViewShowSkeleton={overViewShowSkeleton}
                        />

                        <List 
                            expenseList={expenseList} 
                            expenseListLoading={expenseListLoading}

                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            loadExpenses={loadExpenses}
                            setExpenseListShowSkelton={setExpenseListShowSkelton}
                            expenseListShowSkelton={expenseListShowSkelton}

                            setSelectedExpense={setSelectedExpense}
                        />
                    </div>

                    <div className="col-span-1 px-2">

                        <div className="border-b-0 border-b-gray-800">
                            <ul className="flex gap-1">
                                <li className={`${manageState=="ADD"?"bg-blue-800":"bg-blue-950"}  w-full rounded-t-xl rounded-t-r-xl text-white flex justify-center items-center gap-1 cursor-pointer`} onClick={()=>switchManage("ADD")}><IoIosAddCircleOutline/> Add</li>
                                <li className={`${manageState=="CAT"?"bg-blue-800":"bg-blue-950"} w-full rounded-t-xl rounded-t-r-xl text-white flex justify-center items-center gap-1 cursor-pointer`} onClick={()=>switchManage("CAT")}><MdOutlineDataset/> Category</li>
                            </ul>
                        </div>
                        <div className=" rounded-b-sm border-1 border-gray-800">
                            {manageState=="ADD"&&(<>

                                {!selectedExpense&&(
                                    <AddExpense 
                                        categoryList={categoryList}

                                        selectedDate={selectedDate}
                                        loadExpenses={loadExpenses}
                                        loadOverView={loadOverView}
                                    />
                                )}

                                {selectedExpense&&(
                                    <UpdateExpense 
                                        categoryList={categoryList}

                                        selectedDate={selectedDate}
                                        loadExpenses={loadExpenses}
                                        loadOverView={loadOverView}

                                        selectedExpense={selectedExpense}
                                        setSelectedExpense={setSelectedExpense}
                                    />
                                )}

                            </>)}
                            {manageState=="CAT"&&(<><Category categoryListLoading={categoryListLoading} categoryList={categoryList}/></>)}
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
};

export default Expenses;