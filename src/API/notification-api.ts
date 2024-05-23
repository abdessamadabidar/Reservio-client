import axiosInstance from "@/API/axios.ts";


export default {
	fetchNotifications: async (userId: string, token: string) => {
		return await axiosInstance.get(`/User/${userId}/notifications`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	markAsRead: async (notificationId: string, token: string) => {
		return await axiosInstance.put(`/Notification/${notificationId}/read`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	markAsUnread: async (notificationId: string, token: string) => {
		return await axiosInstance.put(`/Notification/${notificationId}/unread`, {headers: {'Authorization': `Bearer ${token}`}})
	},
	deleteNotification: async (notificationId: string, token: string) => {
		return await axiosInstance.delete(`/Notification/${notificationId}`, {headers: {'Authorization': `Bearer ${token}`}})
	},

}