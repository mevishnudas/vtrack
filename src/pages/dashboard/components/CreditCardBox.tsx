
type CreditCardBoxProps = {
    info:any[]
};

const CreditCardBox = ({info}:CreditCardBoxProps) =>{
    return(
        <>
        <div  className={`rounded-sm grid border-1 border-slate-700 overflow-hidden`}>

                <div className="py-1 px-2">
                    <h1 className="text-white">{info.nick_name}</h1>
                    <h1 className="text-white">**** **** **** {info.last_digit} </h1>
                </div>

                <div className="py-1 px-2 grid grid-cols-2 pt-2">
                    <div className="col-span-1 text-sm">
                        <h1 className="text-xs text-white">Bill Amount</h1>
                        <h1 className="text-white">₹200</h1>
                    </div>

                    <div className="col-span-1 text-sm">
                        <h1 className="text-xs text-white">Due Date</h1>
                        <h1 className="text-white">27-01-2026</h1>
                    </div>
                </div>

                <div className="bg-red-800 text-center text-sm text-white text-shadow-2xs">Not Paid</div>
        </div>
        </>
    );
};

export default CreditCardBox;

