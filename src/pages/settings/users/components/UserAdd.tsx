import { CustomInput } from "../../../../components/formElements/input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { error_message } from "../../../../utils/ErrorMessages";
import { useState } from "react";
import { fetchRequest } from "../../../../services/Fetch";
import { ImSpinner2 } from "react-icons/im";

const UserAddValidationSchema = yup
  .object({
    name: yup.string().required(error_message.required),
    phone: yup.string().matches(/^\+?\d{10,12}$/, error_message.invalid_length).required(error_message.required),
    email: yup.string().nullable().notRequired().email(error_message.invalid_email)
  })
  .required();

type UserAddProps = {
    refreshAfter:any
}

const UserAdd = ({refreshAfter}:UserAddProps) =>{

    const [submitButtonDisable,setSubmitButtonDisable] = useState(false);
    const [submitError,setSubmitError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(UserAddValidationSchema),
    });

    const onSubmit = async (data) =>{

        setSubmitButtonDisable(true);
        setSubmitError(null);

        let response = await fetchRequest({
            method:"POST",
            path:"users/add",
            auth:true,
            body:{
                name:data.name,
                phone:data.phone,
                email:data.email
            }
        });

        setSubmitButtonDisable(false);
        if(response.request){
            
            reset();
            refreshAfter();

        }else{
            setSubmitError("Something went wrong.");
        }

    }

    return(
        <>
       <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-1">

                    <div>
                        <label className="text-sm text-gray-300">Name</label>
                        <CustomInput 
                            type="text"
                            customClassName="w-full rounded-sm"
                            placeholder="Name"

                            autoFocus={true}

                            register={register}
                            name="name"
                        />
                        <p className="text-red-400">{errors.name?.message}</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Phone</label>
                        <CustomInput 
                            type="number"
                            customClassName="w-full rounded-sm"
                            placeholder="Phone"

                            register={register}
                            name="phone"
                        />
                        <p className="text-red-400">{errors.phone?.message}</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <CustomInput 
                            type="email"
                            customClassName="w-full rounded-sm"
                            placeholder="Email"

                            register={register}
                            name="email"
                        />
                        <p className="text-red-400">{errors.email?.message}</p>
                    </div>

                    <div className="pt-2">
                        <button 
                                type="submit" 
                                className="flex gap-1 
                                text-center 
                                justify-center w-20 
                                rounded-sm text-white
                                bg-sky-700 px-2 py-1 
                                text-sm" 

                                disabled={submitButtonDisable}
                            >
                            {submitButtonDisable&&(
                                <ImSpinner2  size={20} className="animate-spin"/>
                            )}
                            Submit
                        </button>
                        <p className="text-red-400 text-sm">{submitError}</p>
                    </div>

                </div>
            </form>
        </>
    );

};

export default UserAdd;