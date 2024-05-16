import SearchRoomsForm from "@/components/custom/search-rooms-form.tsx";
import RoomCard from "@/components/custom/room-card.tsx";
import {useRoom} from "@/hooks/use-room.ts";
import {SquarePen, Trash2} from "lucide-react";



export default function RoomsPage() {

	const {rooms, deleteRoom} = useRoom();


	console.log(rooms)
	return <div className="px-5 md:px-32 lg:px-36 h-full">
		<div className="w-full h-full pt-5">
			<SearchRoomsForm />
			<div className="mt-8 grid md:grid-cols-2 gap-5">
				{rooms?.map((room) => <RoomCard
					key={room.Id}
					room={room}
					updateButton={<button><SquarePen className="size-5 text-primary hover:scale-105 transition-all duration-300" /></button>}
					deleteButton={<button onClick={async() => {await deleteRoom(room.Id)}}><Trash2 className="size-5 text-destructive dark:text-red-600 hover:scale-105 transition-all duration-300" /></button>}
				/>)}
			</div>
		</div>
	</div>
}