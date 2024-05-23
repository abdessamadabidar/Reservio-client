import UserStatisticsCard from "@/components/custom/user-statistics-card.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {RecentUsers} from "@/components/custom/recent-users.tsx";
import RoomStatisticsCard from "@/components/custom/room-statistics-card.tsx";
import ReservationStatisticsCard from "@/components/custom/reservation-statistics-card.tsx";
import {Overview} from "@/chart/bar-chart.tsx";

export default function Dashboard() {

	return <div className="space-y-3">
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<UserStatisticsCard />
			<RoomStatisticsCard />
			<ReservationStatisticsCard />
		</div>
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
			<Card className="col-span-4">
				<CardHeader>
					<CardTitle>Overview</CardTitle>
				</CardHeader>
				<CardContent className="pl-2">
					<Overview />
				</CardContent>
			</Card>
			<Card className="col-span-3 rounded-xl">
				<CardHeader>
					<CardTitle>Recent registered users</CardTitle>
				</CardHeader>
				<CardContent>
					<RecentUsers  />
				</CardContent>
			</Card>
		</div>
	</div>
}