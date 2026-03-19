import React, { useState,useEffect } from "react";
import List from "./sections/List";
import Update from "./sections/Update";
import Add from "./sections/Add";
import {fetchRequest} from "../../services/Fetch";

import PageTitle from "../../utils/PageTitle";
import { format } from "date-fns";

const Repayment = () =>{
    const [bankList,setBankList] = useState([]);
    const [userList,setUserList] = useState([]);
    const [yearList,setYearList] = useState([]);
    const [paymentList,setPaymentList] = useState([]);
    const [selectedPaymentDetail,setPaymentDetail] = useState([]);

    const loadBanks = async () =>{
      
        let response = await fetchRequest({
          path:"master/bank/list",
          auth:true,
          method:"GET"
        });

        if(response.request){
            setBankList(response.data?.data);
        }
    }

    const loadPayee = async () =>{
        
        let response = await fetchRequest({
          path:"users/list",
          auth:true,
          method:"GET"
        });

        if(response.request){
            setUserList(response.data?.data);
        }
    }

    const loadYears = async () =>{
        
        let response = await fetchRequest({
          path:"master/year/list",
          auth:true,
          method:"GET"
        });

        if(response.request){
            setYearList(response.data?.data);
        }
    } 

    const loadPaymentStatus = async () =>{

      let response = await fetchRequest({
          path:"master/payment/status",
          auth:true,
          method:"GET"
        });

        if(response.request){

            let list = response.data?.data;
            setPaymentList(

                list.map(({ value, label }) => ({
                    id:value,
                    name:label
                }))

            );
        }
    }

    const selectedPaymentInfo = (row:any) =>{
        setPaymentDetail(row);
    }

    
    const [repaymentList,setRepaymentList] = useState([]);
    const [repaymentListLoading,setRepaymentListLoading] = useState(false);

    const [selectedMonth,setSelectedMonth] = useState(format(new Date(), "M"));
    const [selectedYear,setSelectedYear] = useState(format(new Date(), "yyyy"));
    const [selectedUser,setSelectedUser] = useState(0);

    const loadRepayments = async (refresh=false) =>{

        setRepaymentListLoading(true);
        if(!refresh) //if not refresh
        { setRepaymentList([]);}

        let body = {
            year:selectedYear,
            month:selectedMonth,
            payee:selectedUser
        };

        let params = {
            path:"repayment/list",
            method:"POST",
            auth:true,
            body:body
        }

        let response = await fetchRequest(params);
        if(response.request){
            if (Array.isArray(response.data?.data)) {
                setRepaymentList(response.data?.data);
            }
        }
        setRepaymentListLoading(false);
    }

    const refreshTheList = () =>{
        loadRepayments(true);
    }

    useEffect(()=>{
      
      loadBanks(); //load bank list
      loadPayee(); //load payee list
      loadYears(); //load year list
      loadPaymentStatus(); //Payment status list
      

      loadRepayments(); //Load Repayment List
      return ()=>{

      }

    },[]);
    return(<>

             <PageTitle pageName="Repayment"/>

             <div className="p-2">
                  <h1 className="font-bold text-white">Repayment</h1>

                  <div className="grid sm:grid-cols-3 grid-cols-1">
                    
                      <div className="col-span-1 py-2 px-1">
                        <List 
                              userList={userList}
                              selectedUser={selectedUser}
                              setSelectedUser={setSelectedUser}

                              yearList={yearList}
                              
                              selectedYear={selectedYear}
                              setSelectedYear={setSelectedYear}

                              selectedMonth={selectedMonth}
                              setSelectedMonth={setSelectedMonth}

                              loading={repaymentListLoading}
                              repaymentList={repaymentList}
                              
                              selectedPaymentInfo={selectedPaymentInfo}
                              loadRepayments={loadRepayments}
                        />
                      </div>
                      
                      <div className="col-span-2 py-2 px-1">

                          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">

                            <div className="col-span-1">
                              <Update 
                                  selectedPaymentDetail={selectedPaymentDetail}
                                  setPaymentDetail={setPaymentDetail}

                                  bankList={bankList}
                                  paymentList={paymentList}
                                  refreshList={refreshTheList}
                              />
                            </div>

                            <div className="col-span-1 sm:px-2">
                              <Add 
                                bankList={bankList} 
                                userList={userList}
                                refreshList={refreshTheList}
                              />
                            </div>
                          </div>

                      </div>

                  </div>
                
             </div>
           </>);   
};

export {Repayment};