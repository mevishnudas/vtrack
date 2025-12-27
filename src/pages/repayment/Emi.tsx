import AddEmi from "./sections/emi/AddEmi";
const Emi = () =>{

    return(
        <>
            <div className="p-4">
                  <h1 className="font-bold text-white">EMI Payments</h1>
                  
                  <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="grid-cols-1 text-white"><AddEmi/></div>
                        <div className="grid-cols-1 text-white">Listing Area</div>
                        <div className="grid-cols-1 text-white">Detail & Update</div>
                  </div>

            </div>
        </>
    );

};

export default Emi;