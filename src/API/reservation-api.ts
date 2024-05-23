import axiosInstance from "@/API/axios.ts";
import {IReservationRequest} from "@/types/types.ts";


export default {
	fetchReservations: async (userId: string, token: string) => {
		return await axiosInstance.get(`/User/${userId}/reservations`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	fetchReservationById: async (reservationId: string) => {
		return await axiosInstance.get(`/Reservation/${reservationId}`)
	},
	fetchAllReservations: async (token: string) => {
		return await axiosInstance.get(`/Reservation`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	createReservation: async (reservation: IReservationRequest, token: string) => {
		const form = new FormData();
		form.append('StartDateTime',reservation.StartDateTime!) ;
		form.append('EndDateTime', reservation.EndDateTime!);
		form.append('Description', reservation.Description!);
		form.append('UserId', reservation.UserId);
		form.append('RoomId', reservation.RoomId);

		return await axiosInstance.post(`/Reservation/new`, form, {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
	},
	deleteReservation : async (reservationId: string, token: string) => {
		return await axiosInstance.delete(`/Reservation/${reservationId}`, {headers: {'Authorization': `Bearer ${token}`}})
	}
}