import Notification from "@/components/custom/notification.tsx";
import {notifications} from "@/static/data/notifications.ts";

export default function Notifications() {
	return <div>
		<div className="grid gap-y-3">
			{notifications.map((notification, index) => <Notification notification={notification} key={index} />)}
		</div>
	</div>
}