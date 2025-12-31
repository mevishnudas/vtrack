type SimpleSelectProps = {
        name:string
        optionList:any[],
        defaultLabelValue?:any,
        defaultLabel?:any,
        customClassName?:any
}

const SimpleSelect = ({name,optionList,defaultLabelValue,defaultLabel,customClassName,...rest}:SimpleSelectProps) =>{

    return(
        <select 
                name={name}
                className={`border-1 
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

                {...rest}
                >
            
            {defaultLabel&&(<option key={defaultLabelValue} value={defaultLabelValue}>{defaultLabel}</option>)}
            
            {optionList.map((row:any)=>(
                <option key={row.id} value={row.id}>{row.name}</option>
            ))}
        </select>
    );
}

const SimpleSelectSingle = ({name,optionList,defaultLabelValue,defaultLabel,customClassName,...rest}:SimpleSelectProps) =>{

    return(
        <select 
                name={name}
                className={`border-1 
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

                {...rest}
                >
            
            {defaultLabel&&(<option key={defaultLabelValue} value={defaultLabelValue}>{defaultLabel}</option>)}
            
            {optionList.map((row:any)=>(
                <option key={row} value={row}>{row}</option>
            ))}
        </select>
    );
}

const SimpleSelectMultiLabel = ({name,optionList,defaultLabel,defaultLabelValue,customClassName,...rest}:SimpleSelectProps) =>{

    return(
        <select 
                name={name}
                className={`border-1 
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
                
                {...rest}
                >
            
            {defaultLabel&&(<option key={defaultLabelValue} value={defaultLabelValue}>{defaultLabel}</option>)}
            
            {optionList.map((row:any)=>(
                <option key={row.value} value={row.value}>{row.label}</option>
            ))}
        </select>
    );
}


type SimpleButtonIconOnly = {
    icon:any
}

const SimpleButtonIconOnly = ({icon,...rest}:SimpleButtonIconOnly) =>{
    return(
        <button 
            className={`bg-blue-700 active:bg-blue-900
                        disabled:bg-blue-900
                        text-amber-50 px-2 
                        py-1 rounded-sm

                        flex
                        justify-center
                        items-center

                        ${rest?.customclassname}
                        `
            }
            {...rest}
        >
        {icon}
        </button>
    )
}


export {SimpleButtonIconOnly,SimpleSelectSingle,SimpleSelect,SimpleSelectMultiLabel}