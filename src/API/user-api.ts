import axiosInstance from "@/API/axios.ts";

import {IChangePasswordRequest, IUserUpdateRequest} from "@/types/types.ts";



export default {


	fetchUser: async (userId: string, token: string) => {
		return await axiosInstance.get(`/User/${userId}`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	updateUser: async (userId: string, user: IUserUpdateRequest, token: string) => {
		return await axiosInstance.put(`/User/${userId}`, user, {headers: {'Authorization': `Bearer ${token}`}})
	},
	changePassword: async (userId: string, passwordRequest: IChangePasswordRequest, token: string) => {
		return await axiosInstance.put(`/User/${userId}/change-password`, passwordRequest, {headers: {'Authorization': `Bearer ${token}`}})
	},
	enableAccount: async (userId: string, token: string) => {
		return await axiosInstance.put(`/User/${userId}/enable`, '', {headers: {'Authorization': `Bearer ${token}`}})
	},
	disableAccount: async (userId: string, token: string) => {
		return await axiosInstance.put(`/User/${userId}/disable`,'',  {headers: {'Authorization': `Bearer ${token}`}})
	},
	fetchAllUsers: async (token: string) => {
		return await axiosInstance.get(`/User`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	fetchUserReservations: async (userId: string, token: string) => {
		return await axiosInstance.get(`/User/${userId}/reservations`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	deleteUser: async (userId: string, token: string) => {
		return await axiosInstance.delete(`/User/${userId}`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	fetchRecentUsers: async (token: string) => {
		return await axiosInstance.get(`/User/recent`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	approveUser: async (userId: string, token: string) => {
		return await axiosInstance.put(`/User/${userId}/approve`, '', {headers: {'Authorization': `Bearer ${token}`}})
	}
}