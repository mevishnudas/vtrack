import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter} from "react-router-dom";
import MainRoute from './routers/routers';
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     {/* <BrowserRouter> */}
      <HelmetProvider>
        <BrowserRouter basename={import.meta.env.VITE_BASE}>
          {/* <App /> */}
            <MainRoute/>
        </BrowserRouter>
      </HelmetProvider>
      
  </StrictMode>,
)
