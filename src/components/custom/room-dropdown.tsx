import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {Ellipsis, Trash2} from "lucide-react";
import {IRoom} from "@/types/types.ts";
import DeleteRoomConfirmationDialog from "@/components/custom/delete-room-confirmation-dialog.tsx";
import {useState} from "react";

interface Props {
	room: IRoom;
}

export default function RoomDropdown({room}: Props) {

	const [isOpen, setOpen] = useState(false);
	const toggleDialog = () => setOpen(!isOpen);


	return <>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="bg-transparent  border-0"
				>
					<Ellipsis className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem >
					<Link to={`/admin/rooms/room/edit/${room?.Id}`} className="flex items-center gap-x-1">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
						</svg>
						Edit
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex items-center gap-x-1 text-destructive focus:text-destructive dark:text-red-600" onClick={toggleDialog}>
					<Trash2 className="size-4" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		<DeleteRoomConfirmationDialog isOpen={isOpen} toggleOpen={toggleDialog} roomId={room?.Id} />
	</>
}