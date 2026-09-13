import { LuRefreshCw } from "react-icons/lu";
import { FaDatabase,FaChartPie } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchRequest } from "../../../../services/Fetch";
import Skeleton from 'react-loading-skeleton';
import { IoIosClose } from "react-icons/io";

type UserSummaryProps = {
    userInfo:any[],
    clearSelection:Function
}
const UserSummary = ({userInfo,clearSelection}:UserSummaryProps) =>{
    const [userSummaryInfo,setUserSummaryInfo] = useState();
    const [loading,setLoading] = useState(false);

    type SummaryCardsProps = {
        title:String,
        icon:any,
        customClass:String,
        total:Number,
        total_amount:Number,
        owe_status:String,
        loading:Boolean
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

    type SKProps = {
        base_color:String
    }
    const SK = ({base_color}:SKProps) =>{
        return(
            <div className="px-2 pt-1">
                <Skeleton 
                    height={80} 
                    baseColor={base_color} 
                    highlightColor="#ffffff" 
                    count={1}
                    borderRadius={5}
                />
            </div>
        );
    }  

    const SummaryCards = ({title,icon,total,total_amount,owe_status,loading,customClass}:SummaryCardsProps) =>{
        if(loading){
            //#804517 -- Brown
            //#243981 -- Blue
            //#005e2b -- Green
            let base_color = "#804517";
            switch (title) {
                case "Repayment":
                    base_color = "#804517";
                    break;
            
                case "EMI":
                    base_color = "#243981";
                break;
                
                case "Splitwise":
                    base_color = "#005e2b";
                break;
            }
            return(
                <SK base_color={base_color}/>
            )
        }else{
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
    }
    
    const loadUserSummary = async (id:Number) =>{
        setLoading(true);
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
        setLoading(false);
        
        //console.log(response);
    }

    

    useEffect(()=>{
        loadUserSummary(userInfo?.id);
    },[userInfo]);

    return(
        <>
        <div className="border-1 border-slate-700 rounded-xl px-2 bg-green-900/10 min-h-100">
            {/* <p className="text-center text-white p-2">Amal CS</p> */}
            <div className="flex justify-between items-center gap-2">
                <h1 className="font-bold p-2 text-xl flex justify-start items-center gap-2"><FaRegUser/> {userInfo?.name}</h1>
                <button className="cursor-pointer" onClick={clearSelection}><IoIosClose size={30}/></button>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t-1 border-t-slate-800 pt-2">
                <div className="col-span-1">
                    <SummaryCards loading={loading} title="Repayment" total={userSummaryInfo?.repayment_total} total_amount={userSummaryInfo?.repayment_total_amount} icon={<LuRefreshCw size={40}/>} customClass="border-yellow-800 bg-yellow-950/30"/>
                </div>
                <div className="col-span-1">
                    <SummaryCards loading={loading} title="EMI" total={userSummaryInfo?.emi_total} total_amount={userSummaryInfo?.emi_total_amount} icon={<FaDatabase size={40}/>} customClass="border-blue-800  bg-blue-950/30"/>
                </div>
                
                <div className="col-span-1">
                    <SummaryCards loading={loading} title="Splitwise" total={userSummaryInfo?.splitwise_total} owe_status={userSummaryInfo?.splitwise_ows_status} icon={<FaChartPie size={40}/>} customClass="border-green-800  bg-green-950/30"/>
                </div>
            </div>

            {!loading&&(
                <p className="text-right px-2 py-1">Grand Total : <label className="font-bold">₹{Number(userSummaryInfo?.grand_total).toLocaleString("en-IN")}</label></p>
            )}
        </div>
        </>
    );
};

export default UserSummary;