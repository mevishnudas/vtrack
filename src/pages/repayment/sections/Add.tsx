import { useForm } from "react-hook-form";

const Add = () =>{
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data:any) => {
        //setLogging(true);
        // tryLogin(data);
        console.log("Submit");
    };

    return(
        <>
            
            <div className="bg-gray-50 border-1 border-gray-300 rounded-sm">
                <h1 className="font-bold bg-blue-900 text-gray-50 px-4 py-1">New Record</h1>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-4 py-3">
                        <div className="grid">
                            <label className="font-bold">Payee</label>
                            <select className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none">
                                <option>Vishnu das</option>
                                <option>Neethu Babu</option>
                            </select>
                        </div>

                        <div className="grid">
                            <label className="font-bold">Amount</label>
                            <input type="number" name="amount" placeholder="Amount" className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Pr.Fee</label>
                            <input type="number" name="pr_fee" placeholder="Pr.Fee" className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Total</label>
                            <p className="border-1 px-2 py-1 rounded-sm border-gray-300 bg-gray-200">200.00</p>
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Payment Date</label>
                            <input type="date" name="pr_fee" placeholder="Pr.Fee" className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="grid py-2">
                            <label className="font-bold">Remarks</label>
                            <textarea  name="remarks" placeholder="Notes" className="
                                    border-1 
                                    border-gray-300 px-2 py-1 
                                    outline-none rounded-sm     
                                    row-3
                                    resize-none
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="grid">
                            <button type="submit" className="bg-blue-600 active:bg-blue-800 text-amber-50 rounded-sm py-1 w-20">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;