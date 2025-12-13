import { useState,useEffect } from 'react'
import { Outlet,useNavigate } from "react-router-dom";
import {fetchRequest} from "./services/Fetch";
import Head from './pages/layout/Head';
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
        <Head/>
        <Outlet />  
        {/* <h1>Footer</h1> */}
      </main>
    </>
  )
}

export default App
