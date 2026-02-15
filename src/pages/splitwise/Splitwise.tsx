import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Owing from "./components/Owing";
import {fetchRequest} from "../../services/Fetch";

import PageTitle from "../../utils/PageTitle";
import { useState,useEffect,useRef } from "react";

import AddExpense from "./components/model/AddExpense";
import SettleUpExpense from "./components/model/SettleUpExpense";
import ExpenseList from "./components/listing/ExpenseList";


const Splitwise = () =>{

    const [friends,setFriends] = useState([]);
    const [friendFilteredList,setFriendsFilteredList] = useState([]);

    const [addExpenseModel,setAddExpenseModel] = useState(false);
    const [settleUpExpenseModel,setSettleUpExpenseModel] = useState(false);
    
    const [expenseListOwsYou,setExpenseListOwsYou] = useState([]);
    const [expenseListYouOws,setExpenseListYouOws] = useState([]);
    const [expenseListOwsYouList,setExpenseListOwsYouList] = useState([]);
    const [expenseListYouOwsList,setExpenseListYouOwsList] = useState([]);

    const inputRef = useRef<HTMLInputElement>(null);
    const [clearSearch,setClearSearch] = useState(false);

    const [loadingExpenseSummary,setLoadingExpenseSummary] = useState(true);

    const [selectedFriend,setSelectedFriend] = useState([]);
    const [friendTransitions,setFriendTransitions] = useState([]);
    const [friendTransitionLoading,setFriendTransitionLoading] = useState(false);
    

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
            setFriendsFilteredList(result); // set filtered list

        }
    }


    const loadExpense = async () =>{

        setLoadingExpenseSummary(true);
        let response = await fetchRequest({
          path:"splitwise/expense/list",
          auth:true,
          method:"POST"
        });

        setLoadingExpenseSummary(false);
        if(response.request){
            let data = response.data?.data;
            
            setExpenseListOwsYou(data?.ows_you);
            setExpenseListYouOws(data?.you_owe);
            
            //set for backup
            setExpenseListOwsYouList(data?.ows_you);
            setExpenseListYouOwsList(data?.you_owe);
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

        //load if user selected
        if(selectedFriend?.id){
            loadFriendTransaction({id:selectedFriend.id});
        }
    }

    type loadFriendTransactionProps = {
        id:number
    }

    const loadFriendTransaction = async ({id}:loadFriendTransactionProps) =>{

        setFriendTransitionLoading(true);
        setFriendTransitions([]); //empty the list 

        let response = await fetchRequest({
            path:"splitwise/expense/friend/summary",
            auth:true,
            method:"POST",
            body:{
                friend:id
            }
        });

        setFriendTransitionLoading(false);
        if(response.request){
            let data = response.data?.data;
            setFriendTransitions(data?.transactions);
            
            setSelectedFriend({ 
                id,
                name:data?.summary?.name,
                balance:data?.summary?.balance,
                //ows_you:ows_you,
                ows_status:data?.summary?.ows_status
            });

        }else{
            //error
        }

    }

    useEffect(()=>{
        loadFriends(); //load friends
        loadExpenseSummary(); //load expense summary
        loadExpense(); //load expense
    },[]);


    const searchUser = (event) =>{

        let search = event.target.value;
        search = search.toLowerCase();

        if(search.length!=""){
            //Ows You
            // const ows_you = expenseListOwsYouList.filter(row =>
            //     row.name.toLowerCase().includes(search)
            // );
            // setExpenseListOwsYou(ows_you);

            //You Owe
            // const you_owe = expenseListYouOwsList.filter(row =>
            //     row.name.toLowerCase().includes(search)
            // );
            // setExpenseListYouOws(you_owe);

            //All friend list sort 
            const sorted_friend_list = friends.filter(row =>
                row.label.toLowerCase().includes(search)
            );
            setFriendsFilteredList(sorted_friend_list);

            setClearSearch(true);
        }else{
            clearSearchResult();
        }
    }

    const clearSearchResult = () =>{
        
        inputRef.current.value = "";

        setClearSearch(false);
        //setExpenseListOwsYou(expenseListOwsYouList);
        //setExpenseListYouOws(expenseListYouOwsList);
        setFriendsFilteredList(friends);
    }

    return(
        <>
            <PageTitle pageName="Splitwise"/>

            <div className="p-2">
                <h1 className="font-bold text-white">Splitwise</h1>

                <div className="grid grid-cols-4 text-white px-2 py-2 gap-2">
                    <div className="col-span-1">
                        <LeftSideBar 
                            friends={friendFilteredList} 
                            setSelectedFriend={setSelectedFriend}

                            searchUser={searchUser}
                            clearSearch={clearSearch}
                            inputRef={inputRef}
                            clearSearchResult={clearSearchResult}
                            loadFriendTransaction={loadFriendTransaction}
                        />
                    </div>

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
                            loadingExpenseSummary={loadingExpenseSummary}
                            //setSelectedFriend={setSelectedFriend}
                        />
                        
                    </div>

                    <div className="col-span-1">
                        <RightSideBar 
                            selectedFriend={selectedFriend}
                            friendTransitions={friendTransitions}
                            friendTransitionLoading={friendTransitionLoading}
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