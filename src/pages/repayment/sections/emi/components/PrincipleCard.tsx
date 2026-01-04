import {format} from "date-fns";


type PrincipleCardProps = {
    index:number,
    duration:number,
    data:any[]
};

const PrincipleCard = ({index,duration,data,...rest}:PrincipleCardProps) =>{
    
        return(
            <div {...rest} className={` rounded-sm text-black cursor-pointer px-2 py-2 ${data?.payment_status==="PAID"?"bg-green-100":"bg-red-100"}`}>

                <div className="grid grid-cols-3">
                    <div>
                        <label><span className="font-bold">({index})</span> Principle</label>
                        <p>EMI ({data?.principle}/{duration}) : <span className="font-bold">Rs.{data?.amount.toLocaleString("en-IN")}</span></p>
                    </div>

                    <div>
                        <label>Payment Date</label>
                        <p className="font-bold">{format(new Date(data?.payment_date),"MMM dd yyyy")}</p>
                    </div>
                    
                    <div>
                        <label>Payment Status</label>
                        <p className="font-bold">{data?.payment_status=="PAID"?"Paid":"Pending"}</p>
                    </div>
                </div>

                {data?.remarks&&(
                    <div>
                        <label className="text-sm font-bold">Remarks</label>
                        <p className="italic">{data?.remarks}</p>
                    </div>
                )}
            </div>
        );
    }

export default PrincipleCard;