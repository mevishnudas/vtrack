// import { Pie, PieChart, Tooltip } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect,useState } from "react";
import { fetchRequest } from "../../../services/Fetch";
import { toastErrorBottomRight } from "../../../utils/Toast";
import { error_message } from "../../../utils/ErrorMessages";
import { ImSpinner6 } from "react-icons/im";
type SummaryChartProps = {
    selectedPeriod:String
};
const SummaryChart = ({selectedPeriod}:SummaryChartProps) =>{

    const [loading,setLoading] = useState(true);
    const [chartData,setChartData] = useState<any>({
                chart: {
                    type: "pie",
                    backgroundColor:'none',
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: "Expense Summary",
                },
                subtitle: {
                    text: "Loading...",
                    align: "center"
                },
                tooltip: {
                    //valueSuffix: "%",
                    valueSuffix: "",
                },
                series: [],
        }
    );
    
    const renderChart = (title:string, series_data:any[]) =>{

        let series = [
                    {
                        name: "Total",
                        borderRadius: 8,
                        borderWidth: 3,
                        innerSize: "70%",
                        dataLabels: [
                            {
                                format: "{point.name}",
                                style: {
                                    color: '#FFFFFF',
                                    textOutline: 'none'
                                }
                            },
                            {
                                format: "{point.percentage:.0f}%",
                                //format: "{point.y}",
                                distance: "-15%",
                                backgroundColor: "contrast",
                                style: {
                                    textOutline: "none"
                                },
                            },
                        ],
                        data: series_data,
                    },
                ];
                
        let subtitle = {
            text: title,
            align: "center"
        }
        setChartData(prev =>({
            ...prev,
            series:series,
            subtitle:subtitle
        }));
    }

    const loadChart = async (selectedPeriod:String) =>{
        setLoading(true);
        const expenseSummary = await fetchRequest({
                path:"expense/summary",
                method:"POST",
                auth:true,
                body:{
                    "period":selectedPeriod
                }
        });

        if(expenseSummary.request){

            let categorySummary = expenseSummary.data?.data;
            let series_data = categorySummary.map((row:any)=> {
                return [row.name,row.total_amount];
            });

            let title = "Unknown";
            switch(selectedPeriod){
                case "today":
                    title = "Today";
                    break;

                case "this_week":
                    title = "This Week";
                    break;
                
                case "last_month":
                    title = "Last Month";
                    break;

                case "this_month":
                    title = "This Month";
                    break;

                case "this_year":
                    title = "This Year";
                    break;  
            }
            renderChart(title,series_data);
            setLoading(false);

        }else{
            toastErrorBottomRight({
                message:error_message.failed_to_load,
            });
        }
       
    }

    useEffect(()=>{
        loadChart(selectedPeriod);
    },[selectedPeriod]);

    return(
        <>  
        <div className="rounded-xl border-1 border-slate-800 overflow-clip">

            {loading &&(
                <div className="min-h-100 flex justify-center items-center gap-1">
                    <ImSpinner6 className="animate-spin text-gray-300" />
                    <p className="text-gray-300 text-center">Rendering...</p>
                </div>
            )}

            {!loading &&(
            <HighchartsReact
                highcharts={Highcharts}
                options={chartData}
            />)}
        </div>
        </>
    );
}
export default SummaryChart;