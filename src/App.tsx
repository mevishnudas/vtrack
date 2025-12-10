import { useState,useEffect } from 'react'
import { Outlet,useNavigate } from "react-router-dom";
import {fetchRequest} from "./services/Fetch";
// import './App.css'

function App() {
  const navigate = useNavigate();

  const tokenValidate = async () =>{
    let params = {
        path:"token/validate",
        method:"GET",
        auth:true
    }
    let response = await fetchRequest(params,navigate);

    console.log(response);
  }

  useEffect(()=>{
    
    //Token Validate
    tokenValidate();

    return()=>{
      //return
    };

  },[]);
  return (
    <>
      <main>
        <Outlet />  
      </main>
    </>
  )
}

export default App
