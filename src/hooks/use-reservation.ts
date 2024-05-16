import {useQuery} from "react-query";
import ReservationApi from "@/API/reservation-api.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";
import {IReservation} from "@/types/types.ts";


export const useReservation = (reservationId?: string) => {


	const {id} = useSelector((state: RootState) => state.userState);

	const {data: userReservations, isLoading}
		= useQuery({
		queryKey: "reservations",
		queryFn: async () => await ReservationApi.fetchReservations(id),
		onSuccess: async (data) => {
			console.log('user reservations',data)
		},
		onError: (error) => {
			console.error('error occurred while fetching reservations', error)
		}
	});


	const {data: reservation, isLoading: isLoadingReservation}
		= useQuery({
		queryKey: ["reservation", reservationId],
		queryFn: async () => await ReservationApi.fetchReservationById(reservationId!),
		onSuccess: async data => {
			console.log('reservation by Id', data)
		},
		onError: err =>  {
			console.error('error occurred while getting reservation by Id', err)
		}
	});




	const Reservation : IReservation = {
		Id:  reservation?.data.id,
		StartDateTime: reservation?.data.startDateTime,
		EndDateTime: reservation?.data.endDateTime,
		Description: reservation?.data.description,
		User: {
			Id: reservation?.data.user.id,
			FirstName: reservation?.data.user.firstName,
			LastName: reservation?.data.user.lastName
		},
		Room: {
			Id: reservation?.data.room.id,
			Name: reservation?.data.room.name,
			Capacity: reservation?.data.room.capacity,
			ImageUrl: reservation?.data.room.imageUrl
		},
		CreatedAt: reservation?.data.createdAt

	} as IReservation;




	const UserReservations = userReservations?.data
		.map((reservation: { id: string; startDateTime: Date; endDateTime: Date; description: string; user: { id: string; firstName: string; lastName: string; }; room: { id: string; name: string; capacity: number; imageUrl: string; }; createdAt: Date; }) => {

		return {
			Id: reservation.id,
			StartDateTime: reservation.startDateTime,
			EndDateTime: reservation.endDateTime,
			Description: reservation.description,
			User: {
				Id: reservation.user.id,
				FirstName: reservation.user.firstName,
				LastName: reservation.user.lastName
			},
			Room: {
				Id: reservation.room.id,
				Name: reservation.room.name,
				Capacity: reservation.room.capacity,
				ImageUrl: reservation.room.imageUrl
			},
			CreatedAt: reservation.createdAt
		}
	}) as IReservation[];






	return {userReservations: UserReservations, reservation: Reservation, isLoading, isLoadingReservation}



}