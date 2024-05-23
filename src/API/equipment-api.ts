import axiosInstance from "@/API/axios.ts";


export default {
	fetchEquipments: async (token: string) => {
		return await axiosInstance.get('/Equipment', {headers: {'Authorization': `Bearer ${token}`}})
	}
}