const PrincipleCard = () =>{
        return(
            <div className="bg-red-100 rounded-sm text-black px-2 py-2">

                <div className="grid grid-cols-3">
                    <div>
                        <label><span className="font-bold">(1)</span> Principle</label>
                        <p>EMI (3/6) : <span className="font-bold">Rs.2,997</span></p>
                    </div>

                    <div>
                        <label>Payment Date</label>
                        <p className="font-bold">Jan 26 2025</p>
                    </div>
                    
                    <div>
                        <label>Payment Status</label>
                        <p className="font-bold">Pending</p>
                    </div>
                </div>

                <div className="">
                    <label className="text-sm font-bold">Remarks</label>
                    <p className="italic">testing.. dhf d fdf g dfnnwerwjr r ewjrjnjnn sdskdjbk</p>
                </div>
            </div>
        );
    }

export default PrincipleCard;