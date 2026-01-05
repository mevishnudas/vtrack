import { Link } from "react-router-dom";
import PageTitle from "../../utils/PageTitle";
import Card from "./components/Card";

const Dash = () =>{
    return(
        <>  
            <PageTitle pageName="Dashboard"/>

            <div className="p-2">
                <h1 className="font-bold text-white">Dashboard</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 py-2">
                    <div>
                        <Card className="from-slate-800 to-slate-900" title="Payment" count={200}/>
                    </div>

                    <div>
                        <Card className="from-slate-800 to-slate-900" title="EMI" count={200}/>
                    </div>

                </div>
                
                
            </div>
            
            

            {/* <Link to="/login">Logout</Link> */}
        </>
    );
};

export default Dash;