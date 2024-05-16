import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Info, SquarePen, X} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {IReservation} from "@/types/types.ts";
import {format} from "date-fns";


interface Props {
	reservation: IReservation,
}

export default function Reservation({reservation}: Props) {


	return <div className="grid md:grid-cols-5 gap-5">
		<div className="md:col-span-3 col-span-5 rounded-xl">
			<img src="/src/assets/petr-magera-fgSpHuVbv50-unsplash.jpg" className="w-full h-full object-cover rounded-xl" alt="" />
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
				<div className="grid gap-y-3 ml-2">
					<div className="flex items-center gap-x-5">
						<p className="font-medium">First name :</p>
						<p className="text-muted-foreground">{reservation?.User.FirstName.charAt(0).toUpperCase() + reservation.User.FirstName.slice(1)}</p>
					</div>
					<div className="flex items-center gap-x-5">
						<p className="font-medium">Last name :</p>
						<p className="text-muted-foreground">{reservation?.User.LastName.charAt(0).toUpperCase() + reservation.User.LastName.slice(1)}</p>
					</div>
					<div className="flex items-center gap-x-5">
						<p className="font-medium">From :</p>
						<p className="text-muted-foreground ">{format(reservation?.StartDateTime, "yyyy-MM-d")}</p>
					</div>
					<div className="flex items-center gap-x-5">
						<p className="font-medium">Start :</p>
						<p className="text-muted-foreground ">{format(reservation?.StartDateTime, "HH:mm a")}</p>
					</div>
					<div className="flex items-center gap-x-5">
						<p className="font-medium">To :</p>
						<p className="text-muted-foreground ">{format(reservation?.EndDateTime, "yyyy-MM-d")}</p>
					</div>
					<div className="flex items-center gap-x-5">
						<p className="font-medium">End :</p>
						<p className="text-muted-foreground ">{format(reservation?.EndDateTime, "HH:mm a")}</p>
					</div>
					<div className="flex items-center gap-x-5">
						<p className="font-medium">Room :</p>
						<p className="text-muted-foreground ">{reservation?.Room.Name}</p>
					</div>
					<div className="flex items-center gap-x-5">
						<p className="font-medium">Capacity :</p>
						<p className="text-muted-foreground ">{reservation?.Room.Capacity}</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col md:flex-row items-center gap-x-3 gap-y-2 justify-end md:absolute md:bottom-0 md:right-0">
				<Button size="sm" variant="outline"  className="flex items-center gap-x-1 w-full">
					<SquarePen className="size-4" />
					Edit
				</Button>
				<Button size="sm" variant="outline" className="dark:bg-red-600 bg-destructive text-white hover:text-white hover:bg-red-600 flex items-center gap-x-1 w-full">
					<X className="w-4 h-4" />
					Cancel
				</Button>
			</CardFooter>
		</Card>
	</div>
}