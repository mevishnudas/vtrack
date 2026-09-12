import { LuRefreshCw } from "react-icons/lu";
import { FaDatabase,FaChartPie } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchRequest } from "../../../../services/Fetch";

type UserSummaryProps = {
    userInfo:any[]
}
const UserSummary = ({userInfo}:UserSummaryProps) =>{
    const [userSummaryInfo,setUserSummaryInfo] = useState();

    type SummaryCardsProps = {
        title:String,
        icon:any,
        customClass:String,
        total:Number,
        total_amount:Number,
        owe_status:String
    }

    const owsStatusLabel = (owe_status:String) =>{

        switch (owe_status) {
            case "OWS_YOU":
                return (<><label className="text-green-400">Ows You</label></>);
                break;
            case "YOU_OWS":
                return (<><label className="text-red-400">You Ows</label></>);
                break;

            default:
                return (<><label className="text-white">Settled Up</label></>);
                break;
        }

    }   
    const SummaryCards = ({title,icon,total,total_amount,owe_status,customClass}:SummaryCardsProps) =>{
        return(
            <>
            <div className={`border-2 rounded-xl p-2 ${customClass}`}>
                <div className="flex">
                    <div className="flex w-20 justify-center items-center">
                        {icon}
                    </div>
                    <div className="w-80">
                        <h2 className="text-sm text-gray-300">{title}</h2>
                        {title=="Splitwise"?(<>
                            <h3>{owsStatusLabel(owe_status)} : ₹{Number(total).toLocaleString("en-IN")}</h3>
                            <h3>&nbsp;</h3>
                        </>):(<>
                            <h3 className="font-bold text-lg">Total : {total}</h3>
                            <h3 className="text-sm text-gray-300">Total Amount : ₹{Number(total_amount).toLocaleString("en-IN")}</h3>
                        </>)}
                    </div>
                </div>
            </div>
            </>
        );
    }
    
    const loadUserSummary = async (id:Number) =>{
        let response = await fetchRequest({
            "auth":true,
            "method":"POST",
            "path":"repayment/user/summary",
            "body":{
                "id":id
            }
        });
        
        if (response?.request){
            let data = response?.data?.data;
            // console.log(data);
            setUserSummaryInfo({
                "repayment_total":data?.repayment?.total,
                "repayment_total_amount":data?.repayment?.total_amount,

                "emi_total":data?.emi?.total,
                "emi_total_amount":data?.emi?.total_amount,
                
                "splitwise_total":data?.splitwise?.total,
                "splitwise_ows_status":data?.splitwise?.ows_status,

                "grand_total":data?.grand_total,
            });
        }
        
        //console.log(response);
    }

    useEffect(()=>{
        loadUserSummary(userInfo?.id);
    },[userInfo]);

    return(
        <>
        <div className="border-1 border-slate-700 rounded-xl px-2 bg-green-900/10 min-h-100">
            {/* <p className="text-center text-white p-2">Amal CS</p> */}
            <h1 className="font-bold p-2 flex justify-start items-center gap-2 text-xl"><FaRegUser/> {userInfo?.name}</h1>
            <div className="grid grid-cols-3 gap-2 border-t-1 border-t-slate-800 pt-2">
                <div className="col-span-1">
                    <SummaryCards title="Repayment" total={userSummaryInfo?.repayment_total} total_amount={userSummaryInfo?.repayment_total_amount} icon={<LuRefreshCw size={40}/>} customClass="border-yellow-800 bg-yellow-950/30"/>
                </div>
                <div className="col-span-1">
                    <SummaryCards title="EMI" total={userSummaryInfo?.emi_total} total_amount={userSummaryInfo?.emi_total_amount} icon={<FaDatabase size={40}/>} customClass="border-blue-800  bg-blue-950/30"/>
                </div>
                
                <div className="col-span-1">
                    <SummaryCards title="Splitwise" total={userSummaryInfo?.splitwise_total} owe_status={userSummaryInfo?.splitwise_ows_status} icon={<FaChartPie size={40}/>} customClass="border-green-800  bg-green-950/30"/>
                </div>
            </div>
            <p className="text-right px-2 py-1">Grand Total : <label className="font-bold">₹{Number(userSummaryInfo?.grand_total).toLocaleString("en-IN")}</label></p>
        </div>
        </>
    );
};

export default UserSummary;