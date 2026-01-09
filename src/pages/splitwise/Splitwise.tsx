import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Owing from "./components/Owing";

import PageTitle from "../../utils/PageTitle";

const Splitwise = () =>{

    return(
        <>
            <PageTitle pageName="Splitwise"/>

            <div className="p-2">
                <h1 className="font-bold text-white">Splitwise</h1>

                
                <div className="grid grid-cols-4 text-white px-2 py-2 gap-2">
                    <div className="col-span-1"><LeftSideBar/></div>
                    <div className="col-span-2 border-l-1 border-l-gray-700"><Owing/></div>
                    <div className="col-span-1"><RightSideBar/></div>
                </div>

            </div>
        </>
    );

};

export default Splitwise;