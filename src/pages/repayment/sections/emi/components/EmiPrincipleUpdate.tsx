import {SimpleInput,SimpleSelectMultiLabel,SimpleSelectMultiLabel02,SimpleTextArea,} from "../../../../../components/formElements/SimpleInputs";

const EmiPrincipleUpdate = () =>{
        return(
            <div className="bg-amber-800 px-2 py-2 grid grid-cols-5 gap-2">
                    <div className="col-span-5 flex justify-between">
                        <div>
                            Amount : <span className="font-bold">Rs.2,997</span>
                        </div>
                        <div><span className="text-sm cursor-pointer">Cancel</span></div>
                    </div>
                    
                    <div className="col-span-2">
                        <SimpleSelectMultiLabel02
                            name="payment_status"
                            optionList={emiPrincipleStatusList}

                            customClassName={"w-full border-gray-100 text-black bg-gray-100"}
                        />
                    </div>
                    
                    <div className="col-span-2">
                        <SimpleTextArea
                            customClassName="bg-gray-100 text-black w-full h-8"
                            placeholder="Remarks"
                        />
                    </div>

                    <div className="col-span-1">
                        <CustomButton
                            type="submit"
                            label="Update"
                            customClassName="bg-gray-100 px-2 h-8 w-full text-blue-600"
                        />
                    </div>

                </div>
        );
    };

export default EmiPrincipleUpdate;