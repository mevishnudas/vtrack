const List = () =>{

    const Card = () =>{
        return(
            <>
            <div className="border-b-1 border-b-gray-800 hover:bg-gray-900 p-2">
                {/* <p className="text-white">List</p> */}
                <div className="grid grid-cols-4">
                    <div className="col-span-3 text-white">
                        <h1>Title</h1>
                        <p>Description</p>
                    </div>
                    <div className="col-span-1 text-whit flex justify-end items-center">
                        <h1 className="text-end text-white text-xl font-bold">₹200</h1>
                        {/* <p className="text-end">Amount</p> */}
                    </div>
                </div>

                <div className="grid grid-cols-4 pt-1">
                    <div className="flex col-span-3">
                        <label className="bg-gray-400 px-2 rounded-2xl text-sm">🎵 Entertainment</label>
                    </div>
                    <div className="col-span-1"><p className="text-gray-500 text-end text-xs">04:41 PM | 08-05-2026</p></div>
                </div>
                
            </div>
            </>
        )
    }

    return(
        <>
            {/* <p>List</p>   */}
            <div className="pt-2 flex justify-end">
                <input type="date" className="text-white border-1 border-gray-500 rounded-sm date-input px-2"/>
            </div>

            <div className="h-120 overflow-y-auto mt-2 rounded-xl min-h-100 border-1  border-gray-800 custom-overflow-track px-1">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </>
    );
};

export default List;