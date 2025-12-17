import { useState,useEffect } from 'react'
import { Outlet } from "react-router-dom";
import {fetchRequest} from "./services/Fetch";
import Head from './pages/layout/Head';
// import './App.css'

function App() {

  const tokenValidate = async () =>{
    let params = {
        path:"token/validate",
        method:"GET",
        auth:true
    }
    let response = await fetchRequest(params);

    //console.log(response);
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
        <div>
          <Outlet/>  
        </div>
      </main>
    </>
  )
}

export default App
