import {useNotification} from "@/hooks/use-notification.ts";
import Notification from "@/components/custom/notification.tsx";



export default function NotificationsPage() {

	const {notifications} = useNotification();

	return <div>
		<div className="grid gap-y-3">
			{notifications?.map((notification) => <Notification notification={notification} key={notification.Id} />)}
			{!notifications?.length && <div className="text-sm text-center text-muted-foreground">No notifications yet</div>}
		</div>
	</div>
}