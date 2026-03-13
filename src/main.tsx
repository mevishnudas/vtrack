import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter} from "react-router-dom";
import MainRoute from './routers/routers';
import { HelmetProvider } from "react-helmet-async";
// import { Provider }  from 'react-redux';
// import { store } from './services/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     {/* <BrowserRouter> */}
     {/* <Provider store={store}> */}

        <HelmetProvider>
          <BrowserRouter basename={import.meta.env.VITE_BASE}>
            {/* <App /> */}
              <MainRoute/>
          </BrowserRouter>
        </HelmetProvider>

      {/* </Provider> */}
  </StrictMode>,
)
