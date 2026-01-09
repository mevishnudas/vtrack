const RightSideBar = () =>{
    return(
        <>  
            <div>
                <h1 className="text-white uppercase">Your balance</h1>

                <div className="py-2">
                    <h2 className="text-green-400">Abhinand owes you</h2>
                    <h1 className="text-2xl font-bold text-green-400">Rs.89</h1>

                    {/* <h2 className="text-red-400">You owe Vishnu</h2> */}
                </div>
            </div>
        </>
    );
};

export default RightSideBar;