// import SearchRoomsForm from "@/components/custom/search-rooms-form.tsx";
import RoomCard from "@/components/custom/room-card.tsx";
import {useRoom} from "@/hooks/use-room.ts";
import {Loader} from "@/components/custom/loader.tsx";
import {LayoutGrid, Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {isAdmin} from "@/state/slices/user-slice.ts";


export default function RoomsPage() {



	const isUserAdmin = useSelector(isAdmin);

	const {rooms, fetchRoomsIsLoading} = useRoom();


	if (fetchRoomsIsLoading) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>
	}



	return <div className="px-5 md:px-32 lg:px-36 h-full">
		<div className="w-full h-full pt-5">
			<div className="flex items-center justify-between text-xl font-semibold">
				<div className="flex items-center gap-x-1.5">
					<LayoutGrid className="size-5" />
					Rooms available
				</div>
				{isUserAdmin && <Link to="/admin/rooms/create-new-room">
                    <Button variant="outline" className="rounded-xl flex items-center gap-x-1.5">
                        <Plus className="size-4" />
                        Add Room
                    </Button>
                </Link>}
			</div>
			<div className="mt-6 grid md:grid-cols-2 gap-5">
				{rooms?.map((room) => <RoomCard
					key={room.Id}
					room={room}
				/>)}
			</div>
		</div>
	</div>
}