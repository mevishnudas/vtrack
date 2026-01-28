import PageTitle from "../../utils/PageTitle";
import CreditCard from "../creditcard/CreditCard";

const Dash = () =>{

    return(
        <>  
            <PageTitle pageName="Dashboard"/>
            <div className="p-2">
                <h1 className="font-bold text-white">Dashboard</h1>
                
                <div className="pt-2 px-1">
                    <CreditCard/>
                </div>

            </div>
        </>
    );
};

export default Dash;