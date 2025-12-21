type updateProps = {
    selectedPaymentDetail:any[]
};

const Update = ({selectedPaymentDetail}:updateProps) =>{

    return(
        <>
            <div className="bg-gray-800 border-1 border-gray-700 rounded-sm px-2 py-2">

                <div className="min-h-80 flex items-center justify-center">
                    <p className="text-center text-sm text-gray-400">Click the list to update the record.</p>
                </div>
                
            </div>
        </>
    );

};

export default Update;