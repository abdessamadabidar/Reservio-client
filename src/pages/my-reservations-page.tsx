import {DataTable} from "@/components/data table/data-table.tsx";
import {Loader} from "@/components/custom/loader.tsx";
import {columns} from "@/components/data table/columns/my-reservations-columns.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";
import {useUser} from "@/hooks/use-user.ts";


export default function MyReservationsPage() {

	const {id} = useSelector((state: RootState) => state.userState);

	const {userReservations, userReservationsAreLoading} = useUser(id)


	if(userReservationsAreLoading) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>

	}

	return <div className="">
		<DataTable columns={columns} data={userReservations} />
	</div>
}