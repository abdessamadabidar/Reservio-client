import {useMutation, useQuery, useQueryClient} from "react-query";
import ReservationApi from "@/API/reservation-api.ts";
import {IReservation, IReservationRequest} from "@/types/types.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";


interface Props {
	reservationId?: string;
	userId?: string;
}


export const useReservation = ({reservationId} : Props = {}) => {

	const {token} = useSelector((state: RootState) => state.userState);
	const queryClient = useQueryClient();


	const {data: reservation, isLoading: isLoadingReservation}
		= useQuery({
		queryKey: ["reservation", reservationId],
		queryFn: async () => await ReservationApi.fetchReservationById(reservationId!),
		onSuccess: async data => {
			console.log('reservation by Id', data)
		},
		onError: err =>  {
			console.error('error occurred while getting reservation by Id', err)
		},
		enabled: !!reservationId
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
			ImageUrl: reservation?.data.room.imagePath
		},
		CreatedAt: reservation?.data.createdAt

	} as IReservation;




	const {data: allReservations, isLoading: allReservationsAreLoading} = useQuery({
		queryKey: ["allReservations"],
		queryFn: async () => await ReservationApi.fetchAllReservations(token),
		onSuccess: async (data) => {
			console.log('all reservations', data)
		},
		onError: (error) => {
			console.error('error occurred while fetching all reservations', error)
		}
	});


	const AllReservations = allReservations?.data
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


	const {mutateAsync: createReservation} = useMutation({
		mutationFn: async (reservation: IReservationRequest) => await ReservationApi.createReservation(reservation, token),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries("room")
			console.log('created reservation', data)
		},
		onError: (error) => {
			console.error('error occurred while creating reservation', error)
		}

	})


	const {mutateAsync: deleteReservationMutation} = useMutation({
		mutationFn: async (reservationId: string) => await ReservationApi.deleteReservation(reservationId, token),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries("userReservations")
			console.log('updated reservation', data)
		},
		onError: (error) => {
			console.error('error occurred while updating reservation', error)
		}
	})


	const reservationsCount = allReservations?.data?.length;
	const reservationsCreatedTodayCount = allReservations?.data?.filter((reservation: { createdAt: string; }) => new Date(reservation.createdAt).toDateString() === new Date().toDateString()).length;



	const createNewReservation = async (reservation: IReservationRequest) => createReservation(reservation);
	const deleteReservation = async (reservationId: string) => deleteReservationMutation(reservationId);

	return {
		reservation: Reservation,
		isLoadingReservation,
		AllReservations,
		allReservationsAreLoading,
		createNewReservation,
		deleteReservation,
		reservationsCount,
		reservationsCreatedTodayCount
	}



}