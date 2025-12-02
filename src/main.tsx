import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter} from "react-router-dom";
import MainRoute from './routers/routers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
      {/* <App /> */}
      <MainRoute/>
    </BrowserRouter>
  </StrictMode>,
)
