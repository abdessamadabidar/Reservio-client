import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ReactNode} from "react";

interface IRoomProps {
	updateButton?: ReactNode;
	deleteButton?: ReactNode;
}

export default function RoomCard({updateButton, deleteButton}: IRoomProps) {
	return <div className="border shadow rounded-2xl p-3 md:flex space-y-4 gap-x-7 group bg-white dark:bg-background">
		<div className="rounded-xl md:w-40 md:aspect-[6/7]  overflow-hidden">
			<img src="/src/assets/coworking-macherzentrum-toggenburg-BSOEhCBXYhk-unsplash.jpg" loading="eager" alt="" className="size-full rounded-xl object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
		</div>
		<div className="flex flex-col justify-between space-y-3 flex-1">
			<div className="flex  flex-col md:items-start space-y-1 gap-x-5">
				<div className="flex items-center justify-between w-full">
					<h5 className="text-2xl font-semibold">Room BG47</h5>
					<div className="flex items-center gap-x-4 pe-2">
						{updateButton}
						{deleteButton}
					</div>
				</div>
				<div className="flex items-center ml-1">
					<div className="flex items-center gap-x-1.5 text-muted-foreground">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-primary">
							<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
						</svg>
						<span className="text-sm">12 Seats</span>
					</div>
				</div>

			</div>
			<div className="flex items-center flex-wrap gap-2 5">
				<Badge variant="outline" className="text-muted-foreground text-xs font-normal whitespace-nowrap">TV</Badge>
				<Badge variant="outline" className="text-muted-foreground text-xs font-normal whitespace-nowrap">Computer</Badge>
				<Badge variant="outline" className="text-muted-foreground text-xs font-normal whitespace-nowrap">air conditioner</Badge>
			</div>

			<Button className="w-full mt-5 h-14 rounded-xl hover:bg-secondary dark:text-white uppercase">Reserve</Button>
		</div>
	</div>
}