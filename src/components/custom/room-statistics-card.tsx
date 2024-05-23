import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import { useRoom } from "@/hooks/use-room";
import {DoorOpen} from "lucide-react";


export default function RoomStatisticsCard() {

	const {roomsCount, roomsAddedTodayCount} = useRoom();


	return <Card className="rounded-xl">
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-sm font-medium">
				Total rooms
			</CardTitle>
			<DoorOpen className={"h-4 w-4 text-muted-foreground"} />
		</CardHeader>
		<CardContent>
			<div className="text-2xl font-bold">{roomsCount}</div>
			<p className="text-xs text-muted-foreground">
				{roomsAddedTodayCount} room add to the database today
			</p>
		</CardContent>
	</Card>
}