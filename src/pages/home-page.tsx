import {Link} from "react-router-dom";
import IndexNavbar from "@/components/custom/index-navbar.tsx";
import {useSelector} from "react-redux";
import {isAuthenticated} from "@/state/slices/user-slice.ts";

export default function HomePage() {
	const isUserAuthenticated  = useSelector(isAuthenticated)


	return <div className="relative overflow-hidden">
		<IndexNavbar />
		<div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div className="max-w-2xl text-center mx-auto">
				<h1 className="block text-3xl font-bold sm:text-4xl md:text-5xl dark:text-white">Meeting <span className="text-primary">excellence</span> <br/> starts here</h1>
				<p className="mt-3 text-lg text-muted-foreground dark:text-white/70">Reserve with <span className="text-primary font-medium">ease</span>, meet with <span className="text-primary font-medium">success</span>.</p>
			</div>

			<div className="mt-10 relative max-w-5xl mx-auto">
				<div className="w-full object-cover h-96 sm:h-[480px] bg-[url('/src/assets/coworking-macherzentrum-toggenburg-BSOEhCBXYhk-unsplash.jpg')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

				<div className="absolute inset-0 size-full">
					<div className="flex flex-col justify-center items-center size-full">
						<Link to={isUserAuthenticated? "/rooms" : "/auth"} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm bg-primary font-semibold rounded-full   text-white shadow-sm hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-secondary">
							<svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
							Get started
						</Link>
					</div>
				</div>

				<div className="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-neutral-900">
					<div className="bg-white size-48 rounded-lg dark:bg-neutral-900"></div>
				</div>

				<div className="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
					<div className="bg-white size-48 rounded-full dark:bg-neutral-900"></div>
				</div>
			</div>
		</div>
	</div>

}