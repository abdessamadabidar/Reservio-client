import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {BookmarkX, Calendar, Clock, DoorOpen, Info, MoveRight, User} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {IReservation} from "@/types/types.ts";
import {format} from "date-fns";
import {Textarea} from "@/components/ui/textarea.tsx";
import CancelReservationConfirmationDialog from "@/components/custom/cancel-reservation-confirmation-dialog.tsx";
import {useState} from "react";


interface Props {
	reservation: IReservation,
}

export default function Reservation({reservation}: Props) {

	const [isOpen, setOpen] = useState(false);
	const toggleDialog = () => setOpen(!isOpen);


	return <div className="grid md:grid-cols-5 gap-5">
		<div className="md:col-span-3 col-span-5 rounded-xl h-[80vh]">
			<img src={reservation?.Room?.ImageUrl} className="w-full h-full object-cover rounded-xl" alt="reserved room" />
		</div>
		<Card className="col-span-5 md:col-span-2  rounded-xl relative">
			<CardHeader className="space-y-0">
				<CardTitle className="text-lg text-primary flex items-center gap-x-2 ">
					<Info className="size-4" />
					Reservation details
				</CardTitle>
				<CardDescription className="ml-6">
					This is reservation details
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 text-sm gap-y-3 ml-2">
					<div className="flex items-center gap-x-3 col-span-1">
						<User className="size-4 text-primary" />
						<p className="text-muted-foreground">{reservation?.User.FirstName.charAt(0).toUpperCase() + reservation?.User.FirstName.slice(1)} {reservation?.User.LastName.charAt(0).toUpperCase() + reservation?.User.LastName.slice(1)}</p>
					</div>
					<div />
					<div className="flex items-center gap-x-3">
						<Calendar className="size-4 text-primary" />
						<p className="text-muted-foreground ">{format(reservation?.StartDateTime, "yyyy-MM-d")}</p>
					</div>
					<div className="flex items-center gap-x-3">
						<Clock className="size-4 text-primary" />
						<p className="text-muted-foreground flex items-center ">{format(reservation?.StartDateTime, "HH:mm a")} <MoveRight className="size-4 mx-2" /> {format(reservation?.EndDateTime, "HH:mm a")}</p>
					</div>

					<div className="flex items-center gap-x-3">
						<DoorOpen className="size-4 text-primary" />
						<p className="text-muted-foreground ">{reservation?.Room.Name}</p>
					</div>
					<div className="flex items-center gap-x-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-primary">
							<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
						</svg>
						<p className="text-muted-foreground ">{reservation?.Room.Capacity}</p>
					</div>
					<div className="col-span-2 space-y-3">
						<p className="font-medium text-primary">Description :</p>
						<Textarea value={reservation?.Description ? reservation?.Description : "-- Empty --"} disabled />
					</div>
					<div className="flex items-center gap-x-5 text-primary">
						<p className="font-medium">Equipments :</p>

					</div>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col md:flex-row items-center gap-x-3 gap-y-2 justify-end md:absolute md:bottom-0 md:right-0">
				<Button size="sm" variant="outline" className="dark:bg-red-600 bg-destructive text-white hover:text-white hover:bg-red-600 flex items-center gap-x-1 w-full" onClick={toggleDialog}>
					<BookmarkX className="w-4 h-4" />
					Cancel
				</Button>
			</CardFooter>
		</Card>
		<CancelReservationConfirmationDialog isOpen={isOpen} toggleOpen={toggleDialog} reservationId={reservation?.Id} />
	</div>
}