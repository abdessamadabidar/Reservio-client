import axiosInstance from "@/API/axios.ts";
import {IReservationRequest} from "@/types/types.ts";


export default {
	fetchReservations: async (userId: string) => {
		return await axiosInstance.get(`/User/${userId}/reservations`)
	},
	fetchReservationById: async (reservationId: string) => {
		return await axiosInstance.get(`/Reservation/${reservationId}`)
	},
	fetchAllReservations: async () => {
		return await axiosInstance.get(`/Reservation`)
	},
	createReservation: async (reservation: IReservationRequest) => {
		const form = new FormData();
		form.append('StartDateTime',reservation.StartDateTime!) ;
		form.append('EndDateTime', reservation.EndDateTime!);
		form.append('Description', reservation.Description!);
		form.append('UserId', reservation.UserId);
		form.append('RoomId', reservation.RoomId);

		return await axiosInstance.post(`/Reservation/new`, form, {headers: {'Content-Type': 'application/json'}})
	},
	deleteReservation : async (reservationId: string) => {
		return await axiosInstance.delete(`/Reservation/${reservationId}`)
	}
}