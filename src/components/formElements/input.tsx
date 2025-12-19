type CustomInputProps = {
    name:string,
    placeholder?:string,
    inputType:string,
    register?:any,
    onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CustomInput = ({name,placeholder,inputType,register,onValueChange,...rest}:CustomInputProps)=>{
    return(
            <input 
                type={inputType} 
                placeholder={placeholder}

                className="border-1 
                    border-gray-600 
                    text-white
                    bg-gray-800 
                    px-2 py-1 
                    w-full
                    outline-none rounded-sm     
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none"
                    
                    {...(register?
                        
                        register(name,{
                            onChange: (e) => {
                                onValueChange?.(e);
                            }
                        })

                    :{})}

                    {...rest}
            />
    )
};


type CustomTextAreaProps = {
    name:string,
    placeholder?:string,
    register?:any
};

const CustomTextArea = ({name,placeholder,register,...rest}:CustomTextAreaProps) =>{
    return(
        <textarea 
            placeholder={placeholder}

            className="
                border-1 
                border-gray-600 
                    text-white
                    bg-gray-800 
                px-2 py-1 
                outline-none rounded-sm     
                row-3
                resize-none
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none"

                {...register(name)}

                {...rest}
        />
    );
}

type CustomSelectProps = {
    name:any,
    label:any,
    optionsList:any,
    defaultValue:string,
    register?:any
}

const CustomSelect = ({name,label,optionsList,defaultValue,register,...rest}:CustomSelectProps) =>{
    return(
        <select
                className={`
                    border-1 
                    border-gray-600 
                    text-white
                    bg-gray-800 
                    px-2 py-1 
                    outline-none rounded-sm     
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none

                    ${rest?.customClassName}
                `}
                
                {...register(name)}

                {...rest}
            >
            <option value={defaultValue} disabled>{label}</option>
                {optionsList.map(row=>(
                    <option  key={row.id} value={row.id}>{row.name}</option>
                ))}
        </select>
    );
}   

export {CustomInput,CustomTextArea,CustomSelect};