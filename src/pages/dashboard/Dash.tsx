import { Link } from "react-router-dom";

const Dash = () =>{
    return(
        <>
            <h1>Dash</h1>
            <Link to="/login">Logout</Link>
        </>
    );
};

export default Dash;