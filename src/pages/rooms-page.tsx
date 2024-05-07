import UserNavbar from "@/components/custom/user-navbar.tsx";
import SearchRoomsForm from "@/components/custom/search-rooms-form.tsx";
import RoomCard from "@/components/custom/room-card.tsx";



export default function RoomsPage() {
	return <div className="h-screen">
		<UserNavbar />
		<div className="px-5 md:px-40 lg:px-52 h-full ">
			<div className="w-full h-full pt-5">
				<SearchRoomsForm />
				<div className="mt-8 grid md:grid-cols-2 gap-5">
					<RoomCard />
					<RoomCard />
				</div>
			</div>
		</div>

	</div>
}