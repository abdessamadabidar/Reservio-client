// @ts-ignore
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis} from "recharts";


const data = [
	{
		name: "08 AM - 10 AM",
		total: Math.floor(Math.random() * 20) + 1,
	},
	{
		name: "10 AM - 12 PM",
		total: Math.floor(Math.random() * 20) + 1,
	},
	{
		name: "12 PM - 14 PM",
		total: Math.floor(Math.random() * 20) + 1,
	},
	{
		name: "14 PM - 16 PM",
		total: Math.floor(Math.random() * 20) + 1,
	},
	{
		name: "16 PM - 18 PM",
		total: Math.floor(Math.random() * 20) + 1,
	},

]

export function Overview() {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<Bar
					dataKey="total"
					fill="currentColor"
					radius={[4, 4, 0, 0]}
					className="fill-primary"
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}