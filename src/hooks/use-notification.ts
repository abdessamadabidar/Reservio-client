import {useMutation, useQuery, useQueryClient} from "react-query";
import NotificationApi from "@/API/notification-api.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";
import {INotification} from "@/types/types.ts";
import { formatDistance } from "date-fns";

export const useNotification = () => {

	const {id, token} = useSelector((state: RootState) => state.userState)
	const queryClient = useQueryClient();
	const {data: notifications, isLoading: notificationsAreLoading} = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => NotificationApi.fetchNotifications(id, token),
		onSuccess: async (response) => {
			queryClient.invalidateQueries("unreadNotificationsCount")
			console.log('Notifications fetched successfully', response)
		},
		onError: (error) => {
			console.log('Error fetching notifications', error)
		}

	});

	const {mutate: MarkAsReadMutation} = useMutation({
		mutationFn: async (notificationId: string) => await NotificationApi.markAsRead(notificationId, token),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["notifications"])
			console.log('Notification marked as read')
		},

		onError: (error) => {
			console.log('Error marking notification as read', error)
		}

	})


	const {mutate: MarkAsUnreadMutation} = useMutation({
		mutationFn: async (notificationId: string) => await NotificationApi.markAsUnread(notificationId, token),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["notifications"])
			console.log('Notification marked as unread')
		},

		onError: (error) => {
			console.log('Error marking notification as unread', error)
		}
	});


	const {mutateAsync: DeleteNotificationMutation} = useMutation({
		mutationFn: async (notificationId: string) => await NotificationApi.deleteNotification(notificationId, token),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["notifications"])
			console.log('Notification deleted')
		},

		onError: (error) => {
			console.log('Error deleting notification', error)
		}
	});



	const Notifications = notifications?.data.map((notification: { title: string; body: string; isRead: boolean; createdAt: string; id: string; }) => {
		return {
			Title: notification.title,
			Body: notification.body,
			IsRead: notification.isRead,
			CreatedAt: formatDistance(notification.createdAt, new Date(), { addSuffix: true }),
			Id: notification.id
		}
	}) as INotification[];



	const countUnreadNotifications: number = notifications?.data.filter((notification: { isRead: boolean; }) => !notification.isRead).length || 0;



	const markAsRead =  (notificationId: string) =>  MarkAsReadMutation(notificationId);
	const markAsUnread =  (notificationId: string) =>  MarkAsUnreadMutation(notificationId);
	const deleteNotification =  (notificationId: string) =>  DeleteNotificationMutation(notificationId);

	return {
		notifications: Notifications,
		markAsRead,
		markAsUnread,
		deleteNotification,
		notificationsAreLoading,
		countUnreadNotifications
	}
}