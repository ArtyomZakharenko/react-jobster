import { Bar,BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarChartComponent({data}: {data: any}) {

	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart data={data} margin={{ top: 50 }}>
				<CartesianGrid strokeDasharray='3 3 ' />
				<XAxis dataKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Bar dataKey='count' fill='#3b82f6' barSize={75} />
			</BarChart>
		</ResponsiveContainer>
	);
}
 export default BarChartComponent;
