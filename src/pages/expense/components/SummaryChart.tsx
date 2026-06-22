import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SummaryChart = () =>{
    const data = [
        { name: "Bills", views: 4000},
        { name: "Groceries", views: 3000 },
        { name: "Business", views: 2000 },
        { name: "Hospital", views: 2780 },
    ];


    return(
        <>
            <p className="text-white">Chart View</p>

            <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                dataKey="name"
                type="category"
                width={80}
                />
                <Tooltip />
                <Bar dataKey="views" radius={[0, 4, 4, 0]} />
            </BarChart>
            </ResponsiveContainer>

        </>
    );
}
export default SummaryChart;