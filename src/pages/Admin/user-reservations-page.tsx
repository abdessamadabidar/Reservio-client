import {DataTable} from "@/components/data table/data-table.tsx";
import {useUser} from "@/hooks/use-user.ts";
import {Loader} from "@/components/custom/loader.tsx";
import {useParams} from "react-router-dom";
import NotFoundPage from "@/pages/not-found-page.tsx";
import {columns} from "@/components/data table/columns/my-reservations-columns.tsx";


export default function UserReservationsPage() {

	const {userId} = useParams();
	const {userReservations, userReservationsAreLoading} = useUser(userId!);



	if(!userId) {
		return <NotFoundPage />
	}

	if (userReservationsAreLoading) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>
	}

	return <div className="">
		<DataTable columns={columns} data={userReservations} />
	</div>
}