import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel, DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {BookmarkX, Info, MoreHorizontal} from "lucide-react";
import {Link} from "react-router-dom";
import CancelReservationConfirmationDialog from "@/components/custom/cancel-reservation-confirmation-dialog.tsx";
import {IReservation} from "@/types/types.ts";
import {useState} from "react";
import {useSelector} from "react-redux";
import {isAdmin} from "@/state/slices/user-slice.ts";


interface Props  {
	reservation: IReservation;
}

export default function ReservationTableDropdown({reservation}: Props) {

	const userIsAdmin = useSelector(isAdmin);

	const [isOpen, setOpen] = useState<boolean>(false);
	const toggleDialog = () => setOpen(!isOpen);

	return <>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link className="flex items-center gap-x-1.5" to={userIsAdmin ? `/admin/reservations/reservation/${reservation.Id}` : `reservation/${reservation.Id}`}>
						<Info className="h-4 w-4"/>
						Details
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex items-center gap-x-1.5 text-destructive dark:text-red-600 focus:text-destructive" onClick={toggleDialog}>
					<BookmarkX className="h-4 w-4"  />
					Cancel
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		<CancelReservationConfirmationDialog isOpen={isOpen} toggleOpen={toggleDialog} reservationId={reservation?.Id} />
	</>
}