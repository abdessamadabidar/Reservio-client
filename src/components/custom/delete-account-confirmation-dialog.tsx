import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {useUser} from "@/hooks/use-user.ts";
import {useLogout} from "@/hooks/use-logout.ts";

interface Props {
	isOpen: boolean;
	toggleOpen: () => void;
	userId: string;
}
export default function DeleteAccountConfirmationDialog({isOpen, toggleOpen, userId}: Props) {


	const {deleteUser} = useUser();
	const {logout} = useLogout();
	const handleAccountDeletion = async () => {
		await deleteUser(userId)
			.then(() => {
				logout();
			})

	}

	return <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>
					Your account cannot be restored. This will permanently delete the your account.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					onClick={handleAccountDeletion}
					className="bg-destructive hover:bg-red-700 text-white dark:bg-red-600">Continue</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
}