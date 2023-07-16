import { CartesianGrid, Tooltip, XAxis, Line, LineChart, YAxis, Legend, ResponsiveContainer } from "recharts";

const Chart = ({ data }) => {
    return <LineChart
        width={1000}
        height={500}
        data={data}
    >
        <Line type="monotone" dataKey="close" stroke="#8884d8" />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="1 1" /> */}
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
    </LineChart>;
};

export default Chart;