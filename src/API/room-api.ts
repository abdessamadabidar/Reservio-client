import axiosInstance from "@/API/axios.ts";
import {IRoomRequest, IRoomUpdateRequest} from "@/types/types.ts";


export default {
	createRoom : async (room: IRoomRequest, token: string) => {
		try {

			const form = new FormData();
			form.append('Name', room.Name);
			form.append('Capacity', room.Capacity.toString());
			form.append('Description', room.Description || '');
			form.append('Equipments', JSON.stringify(room.Equipments));
			form.append('ImageFile', room.ImageFile!);
			const response = await axiosInstance.post('/Room', form,
				{headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}`}})

			return response.data;
		}

		catch (error) {
			console.error('Error creating room:', error);
			throw error;
		}

	},
	fetchAllRooms : async (token: string) => {
		return await axiosInstance.get('/Room', {headers: {'Authorization': `Bearer ${token}`}})
	},
	removeRoom: async (roomId: string, token: string) => {
		return await axiosInstance.delete(`/Room/${roomId}`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	getRoomById: async (roomId: string, token: string) => {
		return await axiosInstance.get(`/Room/${roomId}`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	fetchRoomAvailability: async (roomId: string, date: string, token: string) => {
		return await axiosInstance.get(`/Room/${roomId}/availabilities?date=${date}`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	updateRoom: async (roomId: string, room: IRoomUpdateRequest, token: string) => {
		const updateForm = new FormData();
		updateForm.append('Id', room.Id);
		updateForm.append('Name', room.Name);
		updateForm.append('Capacity', room.Capacity.toString());
		updateForm.append('Description', room.Description || '');
		updateForm.append('ImageFile', room.ImageFile!);
		return await axiosInstance.put(`/Room/${roomId}`, updateForm, {headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}`}})
	},
	updateRoomEquipments: async (roomId: string, equipments: string[], token: string) => {
		return await axiosInstance.put(`/Room/${roomId}/equipments`, equipments, {headers: {'Authorization': `Bearer ${token}`}})
	}

}