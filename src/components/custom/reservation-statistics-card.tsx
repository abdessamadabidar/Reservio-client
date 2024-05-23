import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Bookmark} from "lucide-react";
import {useReservation} from "@/hooks/use-reservation.ts";


export default function ReservationStatisticsCard() {

	const {reservationsCount, reservationsCreatedTodayCount} = useReservation();

	return <Card className="rounded-xl">
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-sm font-medium">
				Total reservations
			</CardTitle>
			<Bookmark className="size-4 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div className="text-2xl font-bold">{reservationsCount}</div>
			<p className="text-xs text-muted-foreground">
				{reservationsCreatedTodayCount} reservations made today
			</p>
		</CardContent>
	</Card>
}