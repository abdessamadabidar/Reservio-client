import {ModeToggle} from "@/components/Theme/mode-toggle.tsx";
import {cn} from "@/lib/utils.ts";
import {ReactNode} from "react";
import UserDropdown from "@/components/custom/user-dropdown.tsx";
import {Link} from "react-router-dom";

interface INavProps {
	sheet?: ReactNode,
	className?: string,
}

export default function UserNavbar({className, sheet}: INavProps) {


	return <header className={cn("py-3 px-5 w-full border-b border-border/40 bg-background/95  backdrop-blur", className)}>
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-x-5">
				{sheet}
				<Link to="/" className="text-xl font-bold font-shrikhand text-primary tracking-wider">Reservio</Link>
			</div>
			<div className="flex items-center gap-x-3">
				<ModeToggle />
				<UserDropdown />
			</div>
		</div>
	</header>
}