import axiosInstance from "@/API/axios.ts";


export default {
	fetchEquipments: async () => {
		return await axiosInstance.get('/Equipment')
	}
}