import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/Theme/mode-toggle.tsx";
import {Link} from "react-router-dom";
import {isAuthenticated} from "@/state/slices/user-slice.ts";
import {useSelector} from "react-redux";
import UserDropdown from "@/components/custom/user-dropdown.tsx";
import {Bell} from "lucide-react";
import {useNotification} from "@/hooks/use-notification.ts";


export default function IndexNavbar() {
	const isUserAuthenticated  = useSelector(isAuthenticated)
	const {countUnreadNotifications} = useNotification();
	return <header className="p-5">
		<div className="flex items-center justify-between">
			<div className="text-2xl font-bold font-shrikhand text-primary tracking-wider">Reservio</div>
			<div className="flex items-center gap-x-3">
				<ModeToggle />
				{isUserAuthenticated && <Link className="mr-1.5" to="/notifications">
                    <div className="relative">{countUnreadNotifications > 0 && <span className="absolute -top-1.5 -right-1 text-xxs aspect-square rounded-full size-3.5 grid place-items-center text-white font-medium bg-red-600">{countUnreadNotifications}</span>}
                        <Bell className="h-5 w-5"/>
                    </div>
                </Link>}
				{!isUserAuthenticated && <Link to="/auth/login">
                    <Button size="sm" className="flex items-center gap-x-1.5 rounded-full hover:bg-secondary dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        Log in
                    </Button>
                </Link>}
				{isUserAuthenticated && <UserDropdown/>}
			</div>
		</div>
	</header>
}