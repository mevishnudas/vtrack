const UserSummary = () =>{
    return(
        <>
        <div className="border-t-1 border-slate-700 px-2">
            <p className="text-center text-white p-2">Amal CS</p>

            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 border-1 border-yellow-900 rounded-sm p-2">
                    <h2>Repayment</h2>
                    <h3>Total : 30</h3>
                    <h3>Total Amount : Rs.20,000</h3>
                </div>
                <div className="col-span-1 border-1 border-blue-900 rounded-sm p-2">
                    <h2>EMI</h2>
                    <h3>Total : 30</h3>
                    <h3>Total Amount : Rs.20,000</h3>
                </div>
                <div className="col-span-1 border-1 border-green-900 rounded-sm p-2">SplitWise</div>
            </div>
        </div>
        </>
    );
};

export default UserSummary;