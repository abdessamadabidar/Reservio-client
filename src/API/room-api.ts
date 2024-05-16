import axiosInstance from "@/API/axios.ts";
import {IRoomRequest} from "@/types/types.ts";


export default {
	createRoom : async (room: IRoomRequest) => {
		try {

			const form = new FormData();
			form.append('Name', room.Name);
			form.append('Capacity', room.Capacity.toString());
			form.append('Description', room.Description || '');
			form.append('Equipments', JSON.stringify(room.Equipments));
			form.append('ImageFile', room.ImageFile!);
			const response = await axiosInstance.post('/Room', form,
				{headers: {'Content-Type': 'multipart/form-data'}})

			return response.data;
		}

		catch (error) {
			console.error('Error creating room:', error);
			throw error;
		}

	},
	fetchAllRooms : async () => {
		return await axiosInstance.get('/Room')
	},
	removeRoom: async (roomId: string) => {
		return await axiosInstance.delete(`/Room/${roomId}`)
	},
	getRoomById: async (roomId: string) => {
		return await axiosInstance.get(`/Room/${roomId}`)
	},
	fetchRoomAvailability: async (roomId: string, date: string) => {
		return await axiosInstance.get(`/Room/${roomId}/availabilities?date=${date}`)
	}

}