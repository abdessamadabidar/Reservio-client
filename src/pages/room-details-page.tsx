import {CalendarIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {addDays, format} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {useState} from "react";
import {Calendar} from "@/components/ui/calendar.tsx";
import RoomAvailability from "@/components/custom/room-availability.tsx";
import RoomDetailsCard from "@/components/custom/room-details-card.tsx";
import {useRoom} from "@/hooks/use-room.ts";
import {useParams} from "react-router-dom";
import {roomSchedule} from "@/static/room-schedule.ts";
import NotFoundPage from "@/pages/not-found-page.tsx";
import {Loader} from "@/components/custom/loader.tsx";



export default function RoomDetailsPage() {

	const {roomId} = useParams();

	const [date, setDate] = useState<Date>(addDays(new Date(), 1));
	const {room, availabilities, fetchRoomsIsLoading, roomAvailabilitiesAreLoading} = useRoom(roomId!, date);




	if (!roomId) {
		return <NotFoundPage />
	}

	if (fetchRoomsIsLoading || roomAvailabilitiesAreLoading) {
		return <div className="absolute top-0 left-0 w-full min-h-screen bg-background">
			<Loader />
		</div>
	}




	return <div className="grid md:grid-cols-2 gap-5">
		<RoomDetailsCard room={room} />
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div className="text-primary flex items-center gap-x-1">
					<CalendarIcon className="size-5" />
					<span className="font-semibold ms-2 ">{date?.toDateString()}</span>
				</div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"md:w-[280px] justify-start text-left font-normal bg-white dark:bg-background rounded-xl",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? format(date, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={date}
							onSelect={(date) => setDate(date!)}
							disabled={(date) => date <= new Date() || date > addDays(new Date(), 3)}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
			{roomSchedule?.map((availability, index) =>{
				const isAvailable = availabilities?.filter(
					(av) => av.StartTime === availability.startTime
										&& av.EndTime === availability.endTime
										&& av.RoomId === roomId
					).length === 0

				return <RoomAvailability roomId={roomId} isAvailable={isAvailable} date={date} key={index} {...availability} />
			})}
		</div>
	</div>
}