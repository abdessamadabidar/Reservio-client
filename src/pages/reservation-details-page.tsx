
import {useReservation} from "@/hooks/use-reservation.ts";
import Reservation from "@/components/custom/reservation.tsx";
import {Loader} from "@/components/custom/loader.tsx";
import {useParams} from "react-router-dom";


export default function ReservationDetailsPage() {

	const {reservationId} = useParams();
	const {reservation, isLoadingReservation} = useReservation(reservationId)


	if(isLoadingReservation) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>
	}

	return <Reservation reservation={reservation} />
}