import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IRoom} from "@/types/types.ts";
import {SquareArrowOutUpRight} from "lucide-react";
import {Link} from "react-router-dom";

interface IRoomProps {
	room: IRoom;
}




export default function RoomCard({room}: IRoomProps) {
	return <div className="border shadow rounded-2xl p-3 md:flex space-y-4 gap-x-7 group bg-white dark:bg-background h-52">
		<div className="rounded-xl md:w-56 md:aspect-[7/4] overflow-hidden">
			<img src={room?.ImagePath} loading="eager" alt="" className="size-full rounded-xl object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
		</div>
		<div className="flex flex-col justify-between space-y-3 flex-1">
			<div className="flex  flex-col md:items-start space-y-1 gap-x-5">
				<div className="flex items-center justify-between w-full">
					<h5 className="text-xl font-semibold">{room?.Name}</h5>
				</div>
				<div className="flex items-center ml-1">
					<div className="flex items-center gap-x-1.5 text-muted-foreground">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-primary">
							<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
						</svg>
						<span className="text-sm">{room?.Capacity} Seats</span>
					</div>
				</div>

			</div>
			<div className="flex items-center flex-nowrap gap-2 5">
				{room?.RoomEquipments?.[0] && <Badge variant="outline" className="text-muted-foreground text-xs font-normal whitespace-nowrap">{room?.RoomEquipments?.[0]?.Name}</Badge>}
				{room?.RoomEquipments?.[1] && <Badge variant="outline" className="text-muted-foreground text-xs font-normal whitespace-nowrap">{room?.RoomEquipments?.[1]?.Name}</Badge>}
				{room?.RoomEquipments?.length > 2 && <Badge variant="outline" className="text-muted-foreground text-xs font-normal whitespace-nowrap">+{room?.RoomEquipments?.length - 2}</Badge>}
				{room?.RoomEquipments?.length == 0 && <p className="text-muted-foreground text-xs font-normal italic whitespace-nowrap">-- No equipments --</p>}
			</div>

			<Link to={`room/${room?.Id}/details`}>
				<Button variant="outline" className="w-full mt-5 py-6 flex items-center gap-x-1.5 rounded-xl dark:text-white">
					View
					<SquareArrowOutUpRight className="size-4" />
				</Button>
			</Link>
		</div>
	</div>
}