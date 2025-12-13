import { Routes, Route, Router } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Dash from "../pages/dashboard/Dash";
import { Repayment } from "../pages/repayment/Repayment";

const MainRoute = () =>{
    return(
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Dash />}/>
                <Route path="/repayment" element={<Repayment />}/>
                {/* <Route path="dashboard" element={<Dash/>}/> */}
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>

    );
}

export default MainRoute;