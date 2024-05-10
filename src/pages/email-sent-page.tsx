import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

export default function EmailSentPage() {
	return (
		<div className="h-screen">
			<div className="h-full flex flex-col flex-nowrap items-center justify-between py-5">
				<div className="text-2xl font-bold font-shrikhand text-primary tracking-wider mt-6">Reservio</div>
				<div className="flex flex-col flex-nowrap items-center gap-y-10">
					<div className="flex flex-col flex-nowrap items-center gap-y-4">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-36">
								<path fill="#9ca3af"  d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v3.525q0 .4-.15.763t-.425.637l-5.45 5.45l-1.45-1.45q-.575-.575-1.425-.575t-1.425.575L10.3 16.3q-.6.6-.488 1.475t.688 1.55q.175.2.075.438T10.2 20zm8-9L5.3 6.8q-.425-.275-.862-.025T4 7.525q0 .225.1.413t.3.312l7.075 4.425q.25.15.525.15t.525-.15L19.6 8.25q.2-.125.3-.312t.1-.413q0-.5-.437-.75T18.7 6.8zm3.95 8.2l4.95-4.95q.275-.275.7-.275t.7.275t.275.7t-.275.7l-5.65 5.65q-.15.15-.325.225t-.375.075t-.375-.075t-.325-.225l-2.85-2.85q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275z"></path>
							</svg>
						</div>
						<p className="text-center">
							Email sent successfully.<br/>
							Please, check you mail inbox.
						</p>
					</div>
					<Link to="https://mail.google.com/" className="mt-5">
						<Button variant="outline"  className="flex flex-nowrap items-center gap-x-2  font-medium  justify-center group dark:text-white rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" width={23.84} height={16} viewBox="0 0 256 193">
								<path fill="#4285f4" d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"></path><path fill="#34a853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"></path><path fill="#ea4335" d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"></path><path fill="#fbbc04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"></path><path fill="#c5221f" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"></path>
							</svg>
							Google Gmail
						</Button>
					</Link>
				</div>
				<div>
					<p className="text-muted-foreground text-sm">Copyright © {new Date().getFullYear()}, All Rights Reserved </p>
				</div>
			</div>
		</div>
	);
}