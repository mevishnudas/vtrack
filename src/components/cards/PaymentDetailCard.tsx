const PaymentDetailCard = () =>{
    return(
        <>
            <div className="bg-gradient-to-b from-[#fff2cc] to-[#fceab4] rounded-sm border-1 border-gray-300 cursor-pointer">

                <div className="p-2">
                    <div className="grid grid-cols-2">
                        <label className="font-bold">Vishnu das</label>
                        <label className="font-bold text-right text-green-700">[ Received ]</label>
                    </div>
                    <p>Amount : 200</p>
                    <p>Pr.Fee : 199</p>
                    <br/>
                    <p>Total : <span className="font-bold">400</span></p>
                    <p>Payment Date : <span className="font-bold">15 Oct</span></p>
                    <p>From : <span className="font-bold">KGB</span></p>
                    <p>Remarks : <span className="italic">Pre close amount</span></p>
                </div>

            </div>
        </>
    );
};

export default PaymentDetailCard;