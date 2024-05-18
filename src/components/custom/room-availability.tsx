import {BookmarkPlus, CircleCheckBig, CircleX, MoveRight} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";


interface IRoomAvailabilityProps {
	date: Date;
	startTime: string;
	endTime: string;
	isAvailable: boolean;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function RoomAvailability({date, startTime, endTime, isAvailable}: IRoomAvailabilityProps) {
	return <div className="rounded-2xl shadow-sm w-full border bg-white dark:bg-background py-5 px-8 space-y-3">
		<div className={
			cn("flex bg-muted rounded-full text-xs font-medium px-3 py-1.5 items-center gap-x-2 text-green-600",
				!isAvailable && "line-through text-foreground"
			)}>
			{isAvailable? <CircleCheckBig className="size-4" /> : <CircleX className="size-4" />}
			Available
		</div>
		<div className="grid md:grid-cols-3 gap-y-3 px-2 md:px-5 py-1">
			<div className="md:col-span-2 flex items-center justify-between md:my-1 my-2 text-xl font-medium">
				<span>{startTime}</span> <MoveRight /> <span>{endTime}</span>
			</div>
			<div className="col-span-1 md:grid md:justify-end w-full">
				<Button disabled={!isAvailable} size="sm" className="rounded-full hover:bg-secondary w-full flex items-center gap-x-1.5 dark:text-white">
					<BookmarkPlus className="size-4" />
					Reserve
				</Button>
			</div>
		</div>
	</div>
}