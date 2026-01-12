import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Owing from "./components/Owing";
import {fetchRequest} from "../../services/Fetch";

import PageTitle from "../../utils/PageTitle";
import { useState,useEffect } from "react";

import SimpleModel from "../../components/modal/SimpleModel";
import Select from 'react-select'

const Splitwise = () =>{
    const [friends,setFriends] = useState([]);
    const [selectedFriends,setSelectedFriends] = useState([]);

    const loadFriends = async () =>{
        
        let response = await fetchRequest({
          path:"users/list",
          auth:true,
          method:"GET"
        });

        if(response.request){

            let data = response.data?.data;
            const result = data.map(({ id, name, ...rest }) => ({ //formatting array
                ...rest,
                value: id,
                label: name
            }));

            setFriends(result); //set value to useState

        }
    }

    const onChange = (selectedOption) =>{
        // console.log(selectedOption);
        setSelectedFriends(selectedOption);
    }

    const [openModel,setOpenModel] = useState(false);

    const openModal = () =>{
        setOpenModel(true);
    };

    const closeModal = () =>{
        setOpenModel(false);
    }



    useEffect(()=>{
        loadFriends(); //load friends
    },[]);

    return(
        <>
            <PageTitle pageName="Splitwise"/>

            <div className="p-2">
                <h1 className="font-bold text-white" onClick={openModal}>Splitwise</h1>

                
                <div className="grid grid-cols-4 text-white px-2 py-2 gap-2">
                    <div className="col-span-1"><LeftSideBar/></div>
                    <div className="col-span-2 border-l-1 border-l-gray-700"><Owing/></div>
                    <div className="col-span-1"><RightSideBar/></div>
                </div>

            </div>

            <SimpleModel isOpen={openModel} setModelStatus={setOpenModel}>
            
                <div className="h-50 w-100 bg-slate-800 rounded-sm p-2">
                    <div>
                        <Select 
                            options={friends} 
                            isMulti 
                            name="colors"  
                            className="text-black bg-amber-900" 
                            classNamePrefix="select"

                            onChange={onChange}
                        />
                    </div>

                    <div className="pt-2">
                        <label className="text-sm text-gray-300">Amount</label>
                        <input type="number" className="w-full bg-slate-700 outline-none px-2 py-2 font-bold text-white border-t-0 border-l-0 border-r-0"/>
                    </div>
                    
                    <div className="pt-2">
                        <p className="text-center text-white">Split <span className="font-bold text-green-600 cursor-pointer">equally</span></p>
                    </div>
                </div>

            </SimpleModel>
        </>
    );

};

export default Splitwise;