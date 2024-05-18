import SearchRoomsForm from "@/components/custom/search-rooms-form.tsx";
import RoomCard from "@/components/custom/room-card.tsx";
import {useRoom} from "@/hooks/use-room.ts";



export default function RoomsPage() {

	const {rooms} = useRoom();
	return <div className="px-5 md:px-32 lg:px-36 h-full">
		<div className="w-full h-full pt-5">
			<SearchRoomsForm />
			<div className="mt-8 grid md:grid-cols-2 gap-5">
				{rooms?.map((room) => <RoomCard
					key={room.Id}
					room={room}
				/>)}
			</div>
		</div>
	</div>
}