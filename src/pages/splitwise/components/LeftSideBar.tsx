const LeftSideBar = () =>{
    return(
        <>
            <div>

                <div>
                    
                    <div className="">
                        <ul>
                            <li className="px-2 py-1 text-white hover:bg-stone-300 hover:text-black cursor-pointer select-none">Overview</li>
                            <li className="px-2 py-1 text-white hover:bg-stone-300 hover:text-black cursor-pointer select-none">Recent Activity</li>
                        </ul>
                    </div>

                    <div>
                        <h1 className=" px-2 py-1 font-bold text-green-300">Friends</h1>
                        <ul>
                            <li className="px-2 py-1 border-b-1 border-slate-700 hover:bg-slate-700 cursor-pointer">Vishnu</li>
                            <li className="px-2 py-1 border-b-1 border-slate-700 hover:bg-slate-700 cursor-pointer">Neethu</li>
                        </ul>
                    </div>

                </div>
                
            </div>
        </>
    );
};

export default LeftSideBar;
