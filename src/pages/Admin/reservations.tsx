import {useReservation} from "@/hooks/use-reservation.ts";
import {DataTable} from "@/components/data table/data-table.tsx";
import {columns} from "@/components/data table/columns/reservation-columns.tsx";
import {Loader} from "@/components/custom/loader.tsx";

export default function Reservations() {
	const {AllReservations, allReservationsAreLoading} = useReservation()


	if(allReservationsAreLoading) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>
	}

	return <div className="">
		<DataTable columns={columns} data={AllReservations}  />
	</div>
}