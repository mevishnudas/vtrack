import OverviewBalance from "./overview/OverviewBalance";
import TitleHead from "./title/TitleHead";

type OwingProps = {
    addExpense:any,
    expenseSummary:any[]
}
const Owing = ({addExpense,expenseSummary}:OwingProps) =>{
    return(
        <>
            <div className="grid grid-cols-3 px-2">

                <div className="col-span-3">
                    <TitleHead title="Overview" addExpense={addExpense}/>
                </div>
                
                <div className="col-span-3">
                    <OverviewBalance 
                        total_balance={expenseSummary?.total} 
                        ows_you={expenseSummary?.ows_you} 
                        you_ows={expenseSummary?.you_owe}
                    />
                </div>

            </div>


        </>
    );
};

export default Owing;