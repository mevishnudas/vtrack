import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Owing from "./components/Owing";

const Splitwise = () =>{

    return(
        <>
            <div className="p-2">
                <h1 className="font-bold text-white">Splitwise</h1>

                
                <div className="grid grid-cols-4 text-white px-5 py-2 gap-2">
                    <div className="col-span-1"><LeftSideBar/></div>
                    <div className="col-span-2"><Owing/></div>
                    <div className="col-span-1"><RightSideBar/></div>
                </div>

            </div>
        </>
    );

};

export default Splitwise;