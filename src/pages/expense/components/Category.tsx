import { CustomInput,CustomButton } from "../../../components/formElements/input";

const Category =()=>{
     return(<>
        <div className="px-4 py-2">

            <div className="border-b-1 border-b-gray-800 pb-2">
                <div>
                    <p className="text-gray-300 py-1 text-sm">Category</p>
                    <CustomInput name="Name" placeholder="Category" inputType="text"/>
                </div>

                <div className="pt-2">
                    <CustomButton label="Submit" type="submit" customClassName="bg-blue-500 px-2 text-white"/>
                </div>
            </div>

            <div className="pt-2">
                <p className="text-gray-300 text-sm">Category List</p>
                <ul>
                    <li className="text-white">
                        🎵 Entertainment
                    </li>
                </ul>
            </div>

        </div>
     </>);
};

export default Category;