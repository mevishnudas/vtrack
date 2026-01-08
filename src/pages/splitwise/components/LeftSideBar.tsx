const LeftSideBar = () =>{
    return(
        <>
            <div>

                <div className="rounded-sm overflow-hidden">
                    <div className="pb-2 bg-blue-800">
                        <ul>
                            <li className="px-2 py-1">Overview</li>
                            <li className="px-2 py-1">Recent Activity</li>
                        </ul>
                    </div>

                    <div>
                        <h1 className="bg-green-700 px-2 py-1 font-bold">Friends</h1>
                        <ul className="bg-slate-800">
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
