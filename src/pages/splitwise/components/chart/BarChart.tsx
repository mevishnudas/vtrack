import { RechartsDevtools } from '@recharts/devtools';
import { Bar, BarChart as ChartBar, XAxis, YAxis } from 'recharts';

const BarChart = () =>{

    const data = [
    {
        name: 'Oct',
        uv: 400,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Nov',
        uv: 300,
        pv: 4567,
        amt: 2400,
    },
    {
        name: 'Dec',
        uv: 300,
        pv: 1398,
        amt: 2400,
    },
    {
        name: 'Jan',
        uv: 200,
        pv: 9800,
        amt: 2400,
    }
      
    ];

    const margin = {
        top: 20,
        //right: 30,
        //left: 20,
        bottom: 25,
    };
    // #endregion

    const formatAxisTick = (value: any): string => {
        return `${value}`;
    };

    const renderCustomBarLabel = ({ x, y, width, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value}</text>;
    };


    return(
        <div className='w-full bg-gray-950 rounded-xl p-2'>

            <h1 className='text-center pb-1'>Overview</h1>
            <ChartBar   
                data={data} 
                margin={margin} 
                // barGap={8}
                width="100%"
                height={400}
                barCategoryGap="40%"
                >
                    <XAxis
                        dataKey="name"
                        tickFormatter={formatAxisTick}
                        label={{ position: 'insideBottom', value: 'Month',dy:15 }}
                    />
                        <Bar dataKey="uv" barSize={12} fill="#3ead7f" label={renderCustomBarLabel} />
                    <RechartsDevtools />
            </ChartBar>

        </div>
    );
};

export default BarChart;