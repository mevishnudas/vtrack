import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Dash from "../pages/dashboard/Dash";

import Splitwise from "../pages/splitwise/Splitwise";

import { Repayment } from "../pages/repayment/Repayment";
import Emi from "../pages/repayment/Emi";

import Users from "../pages/settings/users/users";

const MainRoute = () =>{
    return(
        <Routes>
            
            <Route path="/" element={<App />}>
                <Route index element={<Dash />}/>
                <Route path="/splitwise" element={<Splitwise />}/>
                <Route path="/repayment" element={<Repayment />}/>
                <Route path="/repayment/emi" element={<Emi />}/>

                <Route path="/settings/users" element={<Users />}/>
                {/* <Route path="dashboard" element={<Dash/>}/> */}
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>

    );
}

export default MainRoute;