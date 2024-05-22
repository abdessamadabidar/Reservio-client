import {useNotification} from "@/hooks/use-notification.ts";
import Notification from "@/components/custom/notification.tsx";
import {Loader} from "@/components/custom/loader.tsx";



export default function NotificationsPage() {

	const {notifications, notificationsAreLoading} = useNotification();

	if (notificationsAreLoading) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>
	}


	return <div>
		<div className="grid gap-y-3">
			{notifications?.map((notification) => <Notification notification={notification} key={notification.Id} />)}
			{!notifications?.length && <div className="text-sm text-center text-muted-foreground">No notifications yet</div>}
		</div>
	</div>
}