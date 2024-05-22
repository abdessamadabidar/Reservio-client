import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Link} from "react-router-dom";
import {Bell, Bookmark, DoorOpen, Home, LibraryBig, LogOut, Users} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {useSelector} from "react-redux";
import {isAdmin} from "@/state/slices/user-slice.ts";
import LogoutConfirmationDialog from "@/components/custom/logout-confirmation-dialog.tsx";
import {useState} from "react";
import {useNotification} from "@/hooks/use-notification.ts";
interface Props {
	className?: string
}

export default function DesktopSide({className} : Props) {

	const userIsAdmin = useSelector(isAdmin);
	const {countUnreadNotifications} = useNotification();

	const [isOpen, setOpen] = useState<boolean>(false);
	const toggleDialog = () => setOpen(!isOpen);



	return <aside className={cn("min-h-screen  hidden w-14 flex-col border-r bg-background sm:flex", className)}>
		<nav className="flex flex-col h-full items-center gap-4 px-2 sm:py-5">
			{userIsAdmin && <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            to="/admin/dashboard"
                            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent focus:text-white text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
                        >
                            <Home className="h-5 w-5"/>
                            <span className="sr-only">Dashboard</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>
            </TooltipProvider>}
			{userIsAdmin && <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            to="/admin/reservations"
                            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent focus:text-white text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
                        >
                            <LibraryBig className="h-5 w-5"/>
                            <span className="sr-only">Reservations</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Reservations</TooltipContent>
                </Tooltip>
            </TooltipProvider>}
			{userIsAdmin && <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            to="/admin/users"
                            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent text-muted-foreground focus:text-white transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
                        >
                            <Users className="h-5 w-5"/>
                            <span className="sr-only">Users</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Users</TooltipContent>
                </Tooltip>
            </TooltipProvider>}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="../my-reservations"
							className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent focus:text-white text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
						>
							<Bookmark className="h-5 w-5"/>
							<span className="sr-only">My reservations</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">My reservations</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="../rooms"
							className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent focus:text-white text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
						>
							<DoorOpen className="h-5 w-5"/>
							<span className="sr-only">Rooms</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Rooms</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="../notifications"
							className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent text-muted-foreground focus:text-white transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
						>
							<div className="relative">
								{countUnreadNotifications > 0 && <span className="absolute -top-1.5 -right-1 text-xxs aspect-square rounded-full size-3.5 grid place-items-center text-white font-medium bg-red-600">{countUnreadNotifications}</span>}
								<Bell className="h-5 w-5"/>
							</div>
							<span className="sr-only">Notifications</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Notifications</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
		<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							onClick={toggleDialog}
							className="flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<LogOut className="h-5 w-5 rotate-180 text-destructive dark:text-red-600"/>
							<span className="sr-only">Log out</span>
						</button>
					</TooltipTrigger>
					<TooltipContent side="right">Log out</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<LogoutConfirmationDialog isOpen={isOpen} toggleOpen={toggleDialog}/>
		</nav>
	</aside>
}