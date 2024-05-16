import axiosInstance from "@/API/axios.ts";


export default {
	fetchReservations: async (userId: string) => {
		return await axiosInstance.get(`/User/${userId}/reservations`)
	},
	fetchReservationById: async (reservationId: string) => {
		return await axiosInstance.get(`/Reservation/${reservationId}`)
	}
}