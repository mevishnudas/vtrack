// import { Pie, PieChart, Tooltip } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
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
            text: "Today",
            align: "center"
        },
        tooltip: {
            valueSuffix: "%",
        },
        series: [
            {
                name: "Allocation",
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
                        distance: "-15%",
                        backgroundColor: "contrast",
                        style: {
                            textOutline: "none"
                        },
                    },
                ],

                data: [
                    ["Health care", 34],
                    ["Education", 27],
                    ["Youth programmes", 22],
                    ["Poverty measures", 8],
                    ["Elderly care", 6],
                    ["Other", 3],
                ],
            },
        ],
    };

const SummaryChart = () =>{

    return(
        <>  
        <div className="rounded-xl border-1 border-slate-800 overflow-clip">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
        </>
    );
}
export default SummaryChart;