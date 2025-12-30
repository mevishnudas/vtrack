// import {CustomSelect} from "../../../../components/formElements/input";
import {useState} from "react";
import { Month } from "../../../../utils/Month";
import {format} from "date-fns";
import { FaFilter } from "react-icons/fa";

type EmiListProps ={
    payee_list:any[],
    year_list:any[]
}
const EmiList = ({payee_list,year_list}:EmiListProps) =>{
    
    const [selectedYear,setSelectedYear] = useState(format(new Date(),"yyyy"));
    const [selectedMonth,setSelectedMonth] = useState(format(new Date(),"M"));
    const [selectedPayee,setSelectedPayee] = useState(0);

    type SimpleSelectProps = {
        name:string
        optionList:any[],
        defaultValue:any,
        onChange?:any
        defaultLabel?:any
    }

    const SimpleSelect = ({name,optionList,defaultValue,onChange,defaultLabel,...rest}:SimpleSelectProps) =>{

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
                    ${rest?.customClassName}
                    `}
                    
                    defaultValue={defaultValue}
                    onChange={onChange??""}
                    >
                
                {defaultLabel&&(<option key={defaultValue} value={defaultValue}>{defaultLabel}</option>)}
                
                {optionList.map((row:any)=>(
                    <option key={row.id} value={row.id}>{row.name}</option>
                ))}
            </select>
        );
    }

    const SimpleSelectSingle = ({name,optionList,defaultValue,onChange,defaultLabel,...rest}:SimpleSelectProps) =>{

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
                    ${rest?.customClassName}
                    `}
                    
                    defaultValue={defaultValue}
                    onChange={onChange??""}
                    >
                
                {defaultLabel&&(<option key={defaultValue} value={defaultValue}>{defaultLabel}</option>)}
                
                {optionList.map((row:any)=>(
                    <option key={row} value={row}>{row}</option>
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

    const test = () =>{
        //console.log(selectedYear,selectedPayee);

        console.log(format(new Date(),"yyyy"));
    }

    return( 
        <>  
            <div className="rounded-sm overflow-hidden">
                <div className="grid grid-cols-4 gap-1.5">
                    
                    <div>
                        <SimpleSelectSingle 
                            name="year"
                            defaultValue={selectedYear}        
                            optionList={year_list}
                            onChange={(e)=>setSelectedYear(e.target.value)}
                            
                            customClassName="w-full"
                        />
                    </div>

                    <div>
                    <SimpleSelect 
                        name={"month"} 
                        defaultValue={selectedMonth}    
                        optionList={Month} 
                        onChange={(e)=>setSelectedMonth(e.target.value)}

                        customClassName="w-full"
                    />
                    </div>

                    <div>
                        <SimpleSelect 
                            name={"payee"} 
                            defaultValue={selectedPayee}    
                            optionList={payee_list} 
                            defaultLabel="All"

                            onChange={(e)=>setSelectedPayee(e.target.value)}

                            customClassName="w-full"
                        />
                    </div>

                    <div className="flex justify-center items-right">
                        <SimpleButtonIconOnly
                            icon={<FaFilter size={15}/>}

                            onClick={test}

                            customclassname="w-10 h-full"
                        />
                        
                    </div>

                </div>
            
            </div>
        </>
    );
};

export default EmiList;