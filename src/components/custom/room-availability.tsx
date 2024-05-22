import {BookmarkPlus, CircleCheckBig, CircleX, MoveRight} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {useState} from "react";
import ReservationForm from "@/components/custom/reservation-form.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";
import {formatISO, parse} from "date-fns";
import {toZonedTime} from "date-fns-tz";



interface IRoomAvailabilityProps {
	date: Date;
	startTime: string;
	endTime: string;
	isAvailable: boolean;
	roomId: string;
}



export default function RoomAvailability({date, startTime, endTime, isAvailable, roomId}: IRoomAvailabilityProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggleOpen = () => setIsOpen(!isOpen);

	const userId = useSelector((state: RootState) => state.userState?.id);



	const st = parse(startTime, "hh:mm aa", new Date());
	const et = parse(endTime, "hh:mm aa", new Date());
	st.setSeconds(0);
	et.setSeconds(0)

	const startDateTime = new Date(date?.setHours(st.getHours(), st.getMinutes(), st.getSeconds()));
	const endDateTime = new Date(date?.setHours(et.getHours(), et.getMinutes(), st.getSeconds()));


	const timeZone = "Africa/Casablanca";
	const zonedStartDateTime = toZonedTime(startDateTime, timeZone);
	const zonedEndDateTime = toZonedTime(endDateTime, timeZone);





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
				{isAvailable && "hh"}
			</div>
			<div className="col-span-1 md:grid md:justify-end w-full">
				<Button onClick={toggleOpen} disabled={!isAvailable} size="sm" className="rounded-full hover:bg-secondary w-full flex items-center gap-x-1.5 dark:text-white">
					<BookmarkPlus className="size-4" />
					Reserve
				</Button>
				<ReservationForm
					UserId={userId}
					RoomId={roomId}
					StartDateTime={formatISO(zonedStartDateTime)}
					EndDateTime={formatISO(zonedEndDateTime)}
					toggleOpen={toggleOpen}
					isOpen={isOpen} />
			</div>
		</div>
	</div>
}