import OverviewBalance from "./overview/OverviewBalance";
import ExpenseList from "./listing/ExpenseList";
import TitleHead from "./title/TitleHead";

type OwingProps = {
    addExpense:any
}
const Owing = ({addExpense}:OwingProps) =>{
    return(
        <>
            <div className="grid grid-cols-3 px-2">

                <div className="col-span-3">
                    <TitleHead title="Overview" addExpense={addExpense}/>
                </div>
                
                <div className="col-span-3">
                    <OverviewBalance 
                        total_balance={2000} 
                        you_owe={1750} 
                        you_are_owe={1250}
                    />
                </div>

            </div>

            <ExpenseList/>
        </>
    );
};

export default Owing;