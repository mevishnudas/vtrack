// import {useState} from "react";
import SimpleModel from "../../../../components/modal/SimpleModel";
import { MdDelete } from "react-icons/md";
import {SimpleInput} from "../../../../components/formElements/SimpleInputs";

type EditTransactionProps = {
    openModel:any,
    setOpenModel:()=>void,
    selectedTransaction:any
}

const EditTransaction = ({openModel,setOpenModel,selectedTransaction}:EditTransactionProps) =>{
    return(<>
        {openModel&&
            <SimpleModel isOpen={true} setModelStatus={setOpenModel}>
                <div className="min-w-100 rounded-sm overflow-hidden">
                    <div className="py-1 px-1 bg-green-500">
                        <h1 className="text-sm text-white text-shadow-sm text-shadow-gray-500">Update Transaction</h1>
                    </div>

                    <div className="bg-slate-800 p-2">

                        <div className="pb-2">
                            <SimpleInput 
                                customClassName="w-full bg-slate-700 outline-none px-2 py-1 font-bold text-white rounded-sm border-t-0 border-l-0 border-r-0"
                                placeholder="Amount"
                                type="number"
                            />

                        </div>

                        <div className="flex justify-between">
                            <div>
                                <button className="bg-red-800 text-white rounded-sm px-2 py-1" title="Delete">
                                    <MdDelete size={15}/>
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={()=>setOpenModel(false)} className="bg-gray-300 text-black rounded-sm px-2">Cancel</button>
                                <button className="bg-green-800 text-white rounded-sm px-2">Update</button>
                            </div>
                        </div>

                    </div>

                </div>
            </SimpleModel>
        }
    </>)
}

export default EditTransaction;