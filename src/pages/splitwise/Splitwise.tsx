import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Owing from "./components/Owing";
import {fetchRequest} from "../../services/Fetch";

import PageTitle from "../../utils/PageTitle";
import { useState,useEffect } from "react";

import AddExpense from "./components/model/AddExpense";
import SettleUpExpense from "./components/model/SettleUpExpense";
import ExpenseList from "./components/listing/ExpenseList";

const Splitwise = () =>{

    const [friends,setFriends] = useState([]);
    const [addExpenseModel,setAddExpenseModel] = useState(false);
    const [settleUpExpenseModel,setSettleUpExpenseModel] = useState(false);
    const [expenseListOwsYou,setExpenseListOwsYou] = useState([]);
    const [expenseListYouOws,setExpenseListYouOws] = useState([]);
    
    const [selectedFriend,setSelectedFriend] = useState();
    const [friendTransitions,setFriendTransitions] = useState([]);

    const [expenseSummary,setExpenseSummary] = useState({
        ows_you:0,
        you_owe:0,
        total:0
    });

    const loadFriends = async () =>{
        
        let response = await fetchRequest({
          path:"users/friends/list",
          auth:true,
          method:"GET"
        });

        if(response.request){

            let data = response.data?.data;
            const result = data.map(({ id, name, ...rest }) => ({ //formatting array
                ...rest,
                value: id,
                label: name
            }));

            setFriends(result); //set value to useState

        }
    }


    const loadExpense = async () =>{

        let response = await fetchRequest({
          path:"splitwise/expense/list",
          auth:true,
          method:"POST"
        });

        if(response.request){
            let data = response.data?.data;
            
            setExpenseListOwsYou(data?.ows_you);
            setExpenseListYouOws(data?.you_owe);
            //console.log(data);
        }
    }   

    const loadExpenseSummary = async () =>{

        let response = await fetchRequest({
          path:"splitwise/expense/summary",
          auth:true,
          method:"GET"
        });

        if(response.request){
            let data = response.data?.data;

            setExpenseSummary(prev=>({
                ...prev,
                ows_you:data.ows_you,
                you_owe:data.you_owe,
                total:data.total
            }));
        }

    }

    const refreshExpenseList = async () =>{
        loadExpenseSummary();
        loadExpense();
    }

    const loadFriendTransaction = async (id:number,name:string,balance:number,ows_you:boolean) =>{

        setFriendTransitions([]); //empty the list 
        
        setSelectedFriend((prev:any) => ({ // setup selected user 
            ...prev, 
            id:id,
            name:name,
            balance:balance,
            ows_you:ows_you
        }));

        let response = await fetchRequest({
            path:"splitwise/expense/transaction/list",
            auth:true,
            method:"POST",
            body:{
                friend:id
            }
        });

        if(response.request){
            let data = response.data?.data;
            setFriendTransitions(data);
        }else{
            //error
        }

        //console.log(selectedFriend);
    }

    useEffect(()=>{
        loadFriends(); //load friends
        loadExpenseSummary(); //load expense summary
        loadExpense(); //load expense
    },[]);

    useEffect(()=>{
        console.log("Changed");
        
        if(selectedFriend){
            //loadFriendTransaction = async (id:number,name:string,balance:number,ows_you:boolean)

            //const result = array.filter(item => item.id === id);
        }

    },[expenseListOwsYou,expenseListYouOws]);
    return(
        <>
            <PageTitle pageName="Splitwise"/>

            <div className="p-2">
                <h1 className="font-bold text-white">Splitwise</h1>

                <div className="grid grid-cols-4 text-white px-2 py-2 gap-2">
                    <div className="col-span-1"><LeftSideBar/></div>

                    <div className="col-span-2 border-l-1 border-l-gray-700 border-r border-r-gray-700">
                        
                        <Owing 
                            addExpense={setAddExpenseModel}
                            settleUpExpenseModel={setSettleUpExpenseModel}
                            expenseSummary={expenseSummary}
                        />

                        <ExpenseList 
                            expenseListOwsYou={expenseListOwsYou}
                            expenseListYouOws={expenseListYouOws}
                            loadFriendTransaction={loadFriendTransaction}
                            selectedFriend={selectedFriend}
                            //setSelectedFriend={setSelectedFriend}
                        />
                        
                    </div>

                    <div className="col-span-1">
                        <RightSideBar 
                            selectedFriend={selectedFriend}
                            friendTransitions={friendTransitions}
                        />
                    </div>

                </div>

            </div>

            
            <AddExpense
                openModel={addExpenseModel}
                setOpenModel={setAddExpenseModel}
                friends={friends}
                refreshExpenseList={refreshExpenseList}
            />

            <SettleUpExpense
                openModel={settleUpExpenseModel}
                setOpenModel={setSettleUpExpenseModel}
                friends={friends}
                refreshExpenseList={refreshExpenseList}
            />
        </>
    );

};

export default Splitwise;