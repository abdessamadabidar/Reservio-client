import axiosInstance from "@/API/axios.ts";

import {IUserUpdateRequest} from "@/types/types.ts";




export default {

	fetchUser: async (userId: string) => {
		return await axiosInstance.get(`/User/${userId}`)
	},
	updateUser: async (userId: string, user: IUserUpdateRequest) => {
		return await axiosInstance.put(`/User/${userId}`, user)
	}
}