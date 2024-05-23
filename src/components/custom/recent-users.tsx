
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import {useUser} from "@/hooks/use-user.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils.ts";
import {Check, Clock} from "lucide-react";

export function RecentUsers() {


	const {recentUsers} = useUser();


	return (
		<div className="space-y-8 w-full">
			{recentUsers?.map((user) => {
				return (
					<div className="flex items-center flex-wrap gap-y-1" key={user?.Id}>
						<Avatar className="h-9 w-9">
							<AvatarImage src="/avatars/01.png" alt="Avatar" />
							<AvatarFallback>{user?.FirstName.charAt(0).toUpperCase()}{user?.LastName.charAt(0).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div className="ml-4 space-y-1">
							<p className="text-sm font-medium leading-none">{user?.FirstName} {user?.LastName}</p>
							<p className="text-sm text-muted-foreground">
								{user?.Email}
							</p>
						</div>
						<Badge className={cn("ml-12 md:ml-auto", user?.IsApproved && "bg-muted")} variant="outline">
							{user?.IsApproved && <Check className="h-3 w-3 mr-1" />}
							{!user?.IsApproved && <Clock className="size-3 mr-1" />}
							{user?.IsApproved ? "Approved" : "Not approved"}
						</Badge>
					</div>
				)
			})}
		</div>
	)
}
