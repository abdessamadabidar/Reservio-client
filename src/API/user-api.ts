import axiosInstance from "@/API/axios.ts";

import {IChangePasswordRequest, IUserUpdateRequest} from "@/types/types.ts";




export default {

	fetchUser: async (userId: string) => {
		return await axiosInstance.get(`/User/${userId}`)
	},
	updateUser: async (userId: string, user: IUserUpdateRequest) => {
		return await axiosInstance.put(`/User/${userId}`, user)
	},
	changePassword: async (userId: string, passwordRequest: IChangePasswordRequest) => {
		return await axiosInstance.put(`/User/${userId}/change-password`, passwordRequest)
	},
	enableAccount: async (userId: string) => {
		return await axiosInstance.put(`/User/${userId}/enable`)
	},
	disableAccount: async (userId: string) => {
		return await axiosInstance.put(`/User/${userId}/disable`)
	},
}