type CustomInputProps = {
    name:string,
    placeholder?:string,
    inputType:string,
    register?:any,
    customClassName?:any,
    onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CustomInput = ({name,placeholder,inputType,register,customClassName,onValueChange,...rest}:CustomInputProps)=>{
    return(
            <input 
                type={inputType} 
                placeholder={placeholder}

                className={`
                    border-1 
                    border-gray-600 
                    text-white
                    bg-gray-800 
                    px-2 py-1 
                    w-full
                    outline-none rounded-sm     
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                    
                    ${customClassName}
                    `}
                    
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
    register?:any,
    customClassName?:string,
};

const CustomTextArea = ({name,placeholder,register,customClassName,...rest}:CustomTextAreaProps) =>{
    return(
        <textarea 
            placeholder={placeholder}

            className={`
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
                [&::-webkit-inner-spin-button]:appearance-none
                ${customClassName}`}

                {...register&&register(name)}

                {...rest}
        />
    );
}

type CustomSelectProps = {
    name:any,
    label:any,
    optionsList:any,
    defaultValue:string,
    register?:any,
    customClassName?:string,
}

const CustomSelect = ({name,label,optionsList,defaultValue,register,customClassName,...rest}:CustomSelectProps) =>{
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

                    ${customClassName}
                `}
                
                {...register&&register(name)}

                {...rest}
            >
            <option value={defaultValue} disabled>{label}</option>
                {optionsList.map(row=>(
                    <option  key={row.id} value={row.id}>{row.name}</option>
                ))}
        </select>
    );
}   

type CustomButtonProps = {
    label:string,
    type?:string,
    customClassName?:string,
};

const   CustomButton = ({label,customClassName,type,...rest}:CustomButtonProps) =>{

    return(<>
            <button 
                type={type}
                className={`rounded-sm ${customClassName}`} 
                {...rest}
            >
                {label}
            </button>
           </>);
};

export {CustomInput,CustomTextArea,CustomSelect,CustomButton};