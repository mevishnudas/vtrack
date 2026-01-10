import { useEffect,useState } from 'react'
import { Outlet } from "react-router-dom";
import {fetchRequest} from "./services/Fetch";
import Head from './pages/layout/Head';
import { ToastContainer } from 'react-toastify';
import { ImSpinner3 } from "react-icons/im";
// import './App.css'

function App() {
  const [authorized,setAuthorized] = useState(false);

  const tokenValidate = async () =>{
    let params = {
        path:"token/validate",
        method:"GET",
        auth:true
    }
    await fetchRequest(params);
    setAuthorized(true);
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
    {authorized?(
      <>
        <main>
          <Head/>
          <div className='pt-12'>
            <Outlet/>  
          </div>
        </main>
        <ToastContainer/>
      </>
      ):(
        <>
          <div className='p-2 flex justify-center items-center h-dvh'>
            <ImSpinner3 className='animate-spin text-white' size={20}/>
          </div>
        </>
      )}
    </>
  )
}

export default App
