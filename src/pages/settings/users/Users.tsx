import { useState,useEffect } from "react";
import {fetchRequest} from "../../../services/Fetch";
import PageTitle from "../../../utils/PageTitle";
import { SimpleInput } from "../../../components/formElements/SimpleInputs";
import { CustomInput } from "../../../components/formElements/input";

const Users = () =>{
    const [userList,setUserList] = useState([]);

    const loadUsers = async () =>{
        
        let response = await fetchRequest({
          path:"users/list",
          auth:true,
          method:"GET"
        });

        if(response.request){

            let data = response.data?.data;
            // const result = data.map(({ id, name, ...rest }) => ({ //formatting array
            //     ...rest,
            //     value: id,
            //     label: name
            // }));

            setUserList(data); //set value to useState

        }
    }

    useEffect(()=>{
        loadUsers(); //load users
    },[]);

    return(<>
        <PageTitle pageName="Users"/>

        <div className="p-2">
            <h1 className="font-bold text-white">Users</h1>
            
            <div className="grid grid-cols-3">
                <div>
                    {userList.map(row=>(
                        <p key={row.id} className="text-white">{row.name}</p>
                    ))}
                </div>
                <div className="col-span-2">

                    <div className="w-50">
                        <form>
                            <CustomInput 
                                type="text"
                                customClassName="w-full rounded-sm"
                                placeholder="Name"
                            />
                            <CustomInput 
                                type="number"
                                customClassName="w-full rounded-sm"
                                placeholder="Phone"
                            />

                            <CustomInput 
                                type="email"
                                customClassName="w-full rounded-sm"
                                placeholder="Email"
                            />
                            Payee
                            <input type="radio" name="payee_status" checked/>Yes
                            <input type="radio" name="payee_status"/>No

                            Enable Login
                            <input type="radio" name="enable_login" checked/>No
                            <input type="radio" name="enable_login"/>Yes
                        </form>
                    </div>

                </div>
            </div>

        </div>
        </>
    );
};

export default Users;