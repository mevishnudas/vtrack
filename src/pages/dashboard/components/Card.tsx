type CardProps = {
    title:string,
    count:number,
    className:string
};
const Card = ({title,count,className,...rest}:CardProps) =>{

    return (
        <>
        <div {...rest} className={`bg-linear-to-b p-2 border-1 border-slate-700 rounded-sm ${className} grid grid-cols-2`}>
            
            <div>
                <h1 className="text-white text-center">200</h1>
                <h1 className="text-white text-sm text-center">Last Month</h1>
            </div>

            <div>
                <h1 className="text-white text-center">{count.toLocaleString("en-IN")}</h1>
                <h1 className="text-white text-sm text-center">This Month</h1>
            </div>


            <div className="col-span-2"><h1 className="text-white text-center text-sm font-bold">{title}</h1></div>
            
        </div>
        </>
    );

};

export default Card;