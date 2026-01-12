import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Owing from "./components/Owing";
import {fetchRequest} from "../../services/Fetch";

import PageTitle from "../../utils/PageTitle";
import { useState,useEffect } from "react";

import SimpleModel from "../../components/modal/SimpleModel";
import Select from 'react-select'

import {SimpleTextArea} from "../../components/formElements/SimpleInputs";

const Splitwise = () =>{
    const [friends,setFriends] = useState([]);
    const [selectedFriends,setSelectedFriends] = useState([]);
    const [splitOptionShow,setSplitOptionShow] = useState(false);

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

                <div className="flex gap-2 justify-center items-start">

                    <div className="py-2 px-2 w-100 bg-slate-800 rounded-sm">
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
                            <input type="number" autoFocus={true} className="w-full bg-slate-700 outline-none px-2 py-2 font-bold text-white rounded-sm border-t-0 border-l-0 border-r-0 [appearance:textfield]
                                [&::-webkit-outer-spin-button]:appearance-none
                                [&::-webkit-inner-spin-button]:appearance-none"/>
                        </div>

                        <div className="pt-2">
                            <label className="text-sm text-gray-300">Remarks</label>
                            <SimpleTextArea customClassName="w-full bg-slate-700 text-white"/>
                        </div>
                        
                        <div className="pt-5">
                            <p onClick={()=>setSplitOptionShow(true)} className="text-center text-white font-bold border-2 border-slate-600 py-1 cursor-pointer">Paid by you and split equally</p>
                        </div>

                        <div className="relative">
                            <div className={`bg-slate-800 px-2 py-2 rounded-sm transition-all duration-400 ease-in-out absolute bottom-32 w-full -z-1 ${splitOptionShow?("left-100 opacity-100"):("opacity-0 left-50")}`}>
                                <div onClick={()=>setSplitOptionShow(false)}>
                                    <p className="text-center text-white font-bold border-2 border-slate-600 py-1 px-2 cursor-pointer">Paid by you and split equally</p>
                                    <p className="text-center mt-2 text-green-400 font-bold border-2 border-slate-600 py-1 px-2 cursor-pointer">Owes you</p>
                                    <p className="text-center mt-2 text-red-400 font-bold border-2 border-slate-600 py-1 px-2 cursor-pointer">You owe</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    
                </div>
            </SimpleModel>
        </>
    );

};

export default Splitwise;