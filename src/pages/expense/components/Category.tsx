import { CustomInput,CustomButton } from "../../../components/formElements/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { error_message } from "../../../utils/ErrorMessages";
import { fetchRequest } from "../../../services/Fetch";
import { useState } from "react";

const categorySchema = yup
  .object({
    category: yup.string().required(error_message.required)
  })
  .required();

type CategoryProps = {
    categoryList:any[],
    categoryListLoading:boolean
};
const Category =({ categoryList, categoryListLoading }:CategoryProps)=>{
    const [addCategorySubmitBtn, setAddCategorySubmitBtn] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(categorySchema),
    })

    const onSubmit = async (data:any) =>{
        //console.log(data);
        setAddCategorySubmitBtn(false);

        let response =await fetchRequest({
            path:"expense/category/add",
            method:"POST",
            auth:true,
            body:{
                name:data.category
            }
        });

        if(response.request){
            //alert("Category Added");
        }else{
            //alert("Error Adding Category");
        }

        reset(); //Reset Form
        setAddCategorySubmitBtn(true);
    };

    return(<>
        <div className="px-4 py-2">

            

            <div className="pt-2">
                <p className="text-gray-300 text-sm">Category List</p>
                <div className="max-h-100 overflow-y-auto custom-overflow-track pr-1">
                <ul>
                    { categoryListLoading ? (
                        <li className="text-white" key={0}>Loading...</li>
                    ) : (
                        categoryList.map((item:any)=>(
                             <li className="text-white py-1 border-b-1 border-b-gray-800" key={item.id}>
                                {item.name}
                            </li>
                        ))
                    )}
                </ul>
                </div>
            </div>

            {/* <div className="border-t-1 border-t-gray-800 pb-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-gray-300 py-1 text-sm">Custom Category</label>
                        <CustomInput name="category" placeholder="Category" inputType="text" autoComplete="off" register={register}/>
                        <p className="text-red-400 text-sm ">{errors.category?.message}</p>
                    </div>

                    <div className="pt-2">
                        <CustomButton label="Submit" 
                            type="submit" 
                            disabled={!addCategorySubmitBtn}
                            customClassName={`${addCategorySubmitBtn?"bg-blue-500 cursor-pointer":"bg-blue-700"} px-4 text-white`}
                        />
                    </div>
                </form>
            </div> */}

        </div>
     </>);
};

export default Category;