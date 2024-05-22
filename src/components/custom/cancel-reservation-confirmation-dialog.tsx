import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {useReservation} from "@/hooks/use-reservation.ts";


interface Props {
	isOpen: boolean;
	toggleOpen: () => void;
	reservationId: string;
}


export default function CancelReservationConfirmationDialog({isOpen, toggleOpen, reservationId}: Props) {


	const {deleteReservation} = useReservation();


	const handleReservationCancellation = async () => {
		await deleteReservation(reservationId)
			.then(response => {
				toast({
					description: (
						<div className="flex items-center gap-x-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>
							{response.data}
						</div>
					),
					className: "bg-green-200 text-green-800 dark:bg-green-600 dark:text-white border-0",
				})
			}).catch(error => {
				toast({
					description: (
						<div className="flex items-center gap-x-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
							</svg>
							{error.response.data}
						</div>
					),
					className: "dark:text-red-600 border-0",
					variant: "destructive"
				})
			})
		toggleOpen();


	}


	return <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>
					The reservation cannot be restored. This will permanently delete the reservation.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					onClick={handleReservationCancellation}
					className="bg-destructive hover:bg-red-700 text-white dark:bg-red-600">Continue</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
}