import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Link} from "react-router-dom";
import {Bell, Bookmark, DoorOpen, Home, LineChart, LogOut, Users} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {useSelector} from "react-redux";
import {isAdmin} from "@/state/slices/user-slice.ts";
interface Props {
	className?: string
}

export default function DesktopSide({className} : Props) {

	const userIsAdmin = useSelector(isAdmin);

	return <aside className={cn("min-h-screen  hidden w-14 flex-col border-r bg-background sm:flex", className)}>
		<nav className="flex flex-col h-full items-center gap-4 px-2 sm:py-5">
			{userIsAdmin && <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            to="dashboard"
                            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent focus:text-white text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
                        >
                            <Home className="h-5 w-5"/>
                            <span className="sr-only">Dashboard</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>
            </TooltipProvider>}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="reservations"
							className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent focus:text-white text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
						>
							<Bookmark className="h-5 w-5"/>
							<span className="sr-only">Reservations</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Reservations</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="rooms"
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
							to="users"
							className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent text-muted-foreground focus:text-white transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
						>
							<Users className="h-5 w-5"/>
							<span className="sr-only">Users</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Users</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="notifications"
							className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent text-muted-foreground focus:text-white transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
						>
							<Bell className="h-5 w-5"/>
							<span className="sr-only">Notifications</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Notifications</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="analytics"
							className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent focus:text-white text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 focus:bg-primary"
						>
							<LineChart className="h-5 w-5"/>
							<span className="sr-only">Analytics</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Analytics</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
		<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<LogOut className="h-5 w-5 rotate-180 text-destructive dark:text-red-600"/>
							<span className="sr-only">Log out</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Log out</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
	</aside>
}