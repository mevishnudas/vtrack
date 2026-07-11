// import { Pie, PieChart, Tooltip } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect,useState } from "react";
import { fetchRequest } from "../../../services/Fetch";
import { toastErrorBottomRight } from "../../../utils/Toast";
import { error_message } from "../../../utils/ErrorMessages";
type SummaryChartProps = {
    selectedPeriod:String
};
const SummaryChart = ({selectedPeriod}:SummaryChartProps) =>{

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
    
    const renderChart = (expenseSummary:any) =>{

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
                        data: [
                            ["Health care", 340],
                            ["Education", 27],
                            ["Youth programmes", 22],
                            ["Poverty measures", 8],
                            ["Elderly care", 6],
                            ["Other", 3],
                        ],
                    },
                ];
                
        let subtitle = {
            text: "Today",
            align: "center"
        }
        setChartData(prev =>({
            ...prev,
            series:series,
            subtitle:subtitle
        }));
    }

    const loadChart = async (selectedPeriod:String) =>{

        const expenseSummary = await fetchRequest({
                path:"expense/summary",
                method:"POST",
                auth:true,
                body:{
                    "period":selectedPeriod
                }
        });

        if(expenseSummary.request){

        }else{
            toastErrorBottomRight({
                message:error_message.failed_to_load,
            });
        }
        // console.log(expenseSummary);
        renderChart(expenseSummary);
    }

    useEffect(()=>{
        console.log("Chart Load");
        loadChart(selectedPeriod);
    },[selectedPeriod]);

    return(
        <>  
        <div className="rounded-xl border-1 border-slate-800 overflow-clip">
            <HighchartsReact
                highcharts={Highcharts}
                options={chartData}
            />
        </div>
        </>
    );
}
export default SummaryChart;