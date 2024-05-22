import axiosInstance from "@/API/axios.ts";


export default {
	fetchNotifications: async (userId: string) => {
		return await axiosInstance.get(`/User/${userId}/notifications`)
	},
	markAsRead: async (notificationId: string) => {
		return await axiosInstance.put(`/Notification/${notificationId}/read`)
	},
	markAsUnread: async (notificationId: string) => {
		return await axiosInstance.put(`/Notification/${notificationId}/unread`)
	},
	deleteNotification: async (notificationId: string) => {
		return await axiosInstance.delete(`/Notification/${notificationId}`)
	},
	unreadNotificationsCount: async (userId: string) => {
		return await axiosInstance.get(`/Notification/${userId}/unread/count`)
	}
}