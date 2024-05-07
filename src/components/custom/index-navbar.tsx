import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/Theme/mode-toggle.tsx";
import {Link} from "react-router-dom";

export default function IndexNavbar() {
	return <header className="p-5">
		<div className="flex items-center justify-between">
			<div className="text-2xl font-bold font-shrikhand text-primary tracking-wider">Reservio</div>
			<div className="flex items-center gap-x-3">
				<ModeToggle />
				<Link to="/auth">
					<Button size="sm" className="flex items-center gap-x-1.5 rounded-full hover:bg-secondary dark:text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
						</svg>
						Log in
					</Button>
				</Link>
			</div>
		</div>
	</header>
}