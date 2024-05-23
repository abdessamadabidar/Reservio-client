import {IUser} from "@/types/types.ts";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, MoreHorizontal, ShieldCheck, ShieldMinus, UserRoundCheck, UserRoundX} from "lucide-react";
import {Link} from "react-router-dom";
import {useUser} from "@/hooks/use-user.ts";
import DeleteUserConfirmationDialog from "@/components/custom/delete-user-confirmation-dialog.tsx";
import {useState} from "react";


interface Props {
	user: IUser;
}

export default function UserTableDropdown({user}: Props) {

	const {enableAccount, disableAccount, approveUser} = useUser(user.Id!);

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
					<Link className="flex items-center gap-x-1.5" to={`user/${user.Id!}/reservations`}>
						<Bookmark className="h-4 w-4"/>
						Reservations
					</Link>
				</DropdownMenuItem>
				{!user?.IsApproved && <DropdownMenuItem className="flex items-center gap-x-1.5" onClick={approveUser}><UserRoundCheck className="h-4 w-4"/>Approve</DropdownMenuItem>}
				{user?.IsActivated && <DropdownMenuItem onClick={disableAccount} className="flex items-center gap-x-1.5"><ShieldMinus className="h-4 w-4"  />Disable</DropdownMenuItem>}
				{!user?.IsActivated && <DropdownMenuItem onClick={enableAccount} className="flex items-center gap-x-1.5"><ShieldCheck className="h-4 w-4"  />Enable</DropdownMenuItem>}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex items-center gap-x-1.5 text-destructive dark:text-red-600 focus:text-destructive" onClick={toggleDialog}>
					<UserRoundX className="h-4 w-4"  />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		<DeleteUserConfirmationDialog
			userId={user.Id!}
			isOpen={isOpen}
			toggleOpen={toggleDialog}
		/>
	</>



}