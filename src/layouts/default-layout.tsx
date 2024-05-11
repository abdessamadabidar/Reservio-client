import UserNavbar from "@/components/custom/user-navbar.tsx";
import MobileAdminSide from "@/components/custom/mobile-admin-side.tsx";
import DesktopAdminSide from "@/components/custom/desktop-admin-side.tsx";
import {Outlet} from "react-router-dom";

export default function DefaultLayout() {




	return <div className="flex min-h-screen w-full flex-col bg-muted/40">
		<UserNavbar className="relative" sheet={<MobileAdminSide />} />
		<div className="flex">
			<DesktopAdminSide />
			<main className="w-full py-8 px-5 md:px-20">
				<Outlet />
			</main>
		</div>

	</div>
}