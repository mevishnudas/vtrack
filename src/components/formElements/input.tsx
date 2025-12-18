type inputHookFormProps = {
    placeholder?:string,
    register?:any,
    
};
const inputHookForm = ()=>{
    return(
        <>
            <input type="number" 
                placeholder="Amount"
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
                
                    {...register("amount",{
                            onChange: (e) => {
                                reCalcTotal(e);
                            }
                    })}
            />
        </>
    )
};

export {inputHookForm}