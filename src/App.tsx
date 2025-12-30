import { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import {fetchRequest} from "./services/Fetch";
import Head from './pages/layout/Head';
import { ToastContainer } from 'react-toastify';
// import './App.css'

function App() {

  const tokenValidate = async () =>{
    let params = {
        path:"token/validate",
        method:"GET",
        auth:true
    }
    await fetchRequest(params);

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

      <ToastContainer/>
    </>
  )
}

export default App
