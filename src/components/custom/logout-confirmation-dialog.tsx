import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {useLogout} from "@/hooks/use-logout.ts";
import {toast} from "@/components/ui/use-toast.ts";


interface Props {
	isOpen: boolean;
	toggleOpen: () => void;
}

export default function LogoutConfirmationDialog({isOpen, toggleOpen}: Props) {




	const {logout} = useLogout();

	const handleLogout = async () => {
		logout();
		toast({
			description: (
				<div className="flex items-center gap-x-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg>
					Logged out successfully
				</div>
			),
			className: "bg-amber-200 text-amber-800 dark:bg-amber-600 dark:text-white border-0",
		})
	}

	return <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you sure?</AlertDialogTitle>
				<AlertDialogDescription>
					The action will log you out of the application, are you sure you want to continue?
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					onClick={handleLogout}
					className="bg-destructive hover:bg-red-700 text-white dark:bg-red-600">Continue</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>

}