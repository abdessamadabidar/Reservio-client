import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Info} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {IRoom} from "@/types/types.ts";
import ExpandedImageDialog from "@/components/custom/expanded-image-dialog.tsx";
import RoomDropdown from "@/components/custom/room-dropdown.tsx";
import {useSelector} from "react-redux";
import {isAdmin} from "@/state/slices/user-slice.ts";



interface Props {
	room: IRoom;
}

export default function RoomDetailsCard({room}: Props) {

	const userIsAdmin = useSelector(isAdmin);


	return <Card className="rounded-2xl text-sm">
		<CardHeader className="space-y-0 flex flex-row items-center justify-between">
			<CardTitle className="text-lg text-primary flex items-center gap-x-1.5 font-semibold">
				<Info className="size-4" />
				Room details
			</CardTitle>
			{userIsAdmin && <RoomDropdown room={room} />}
		</CardHeader>
		<CardContent className="space-y-6">
			<div className="h-80 rounded-xl overflow-hidden relative">
				<ExpandedImageDialog className="absolute text-white top-5 left-5 " ImagePath={room?.ImagePath} />
				<img src={room?.ImagePath} className="w-full h-full object-cover rounded-xl" alt="" />
			</div>
			<div className="grid gap-y-4 ml-2">
				<div className="flex items-center gap-x-5">
					<p className="font-medium">Name :</p>
					<p className="text-muted-foreground">{room?.Name}</p>
				</div>
				<div className="flex items-center gap-x-5">
					<p className="font-medium">Capacity :</p>
					<p className="text-muted-foreground">{room?.Capacity}</p>
				</div>
				<div className="space-y-3">
					<p className="font-medium">Description :</p>
					<Textarea disabled value={room?.Description ? room?.Description : "-- empty --"} />
				</div>
				<div className="space-y-3">
					<p className="font-medium">Equipments :</p>
					<div className="flex flex-wrap gap-x-3 gap-y-2">
						{room?.RoomEquipments && room?.RoomEquipments?.map((equipment) => <Badge variant="outline" key={equipment?.Id} className="text-muted-foreground text-xs font-normal whitespace-nowrap">{equipment?.Name}</Badge>)}
						{room?.RoomEquipments?.length === 0 && <p className="text-muted-foreground text-xs italic">-- No equipments --</p>}
					</div>
				</div>

			</div>
		</CardContent>
	</Card>
}