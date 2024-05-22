import {
	Dialog,
	DialogContent,

} from "@/components/ui/dialog"
import {Textarea} from "@/components/ui/textarea.tsx";
import {Ban, Check, CircleCheckBig} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {IReservationRequest} from "@/types/types.ts";
import {FormEvent, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {useReservation} from "@/hooks/use-reservation.ts";
import {toast} from "@/components/ui/use-toast.ts";




interface Props {
	isOpen: boolean;
	toggleOpen: () => void;
	StartDateTime: string;
	EndDateTime: string;
	RoomId: string;
	UserId: string;
}

export default function ReservationForm({isOpen, toggleOpen, StartDateTime, EndDateTime, UserId, RoomId}: Props){



	const {createNewReservation} = useReservation();



	const [form, setForm] = useState<IReservationRequest>({
		StartDateTime: StartDateTime,
		EndDateTime: EndDateTime,
		RoomId: RoomId,
		UserId: UserId,
		Description: ''
	})







	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();



		createNewReservation(form)
			.then((response) => {
				toast({
					description: (
						<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100 flex items-center gap-x-1.5">
							<CircleCheckBig className="size-4" />
							{response?.data.toString()}
						</div>
					),
					className: "bg-green-600 border-0 text-slate-100"
				})
			})
			.catch((error) => {
				toast({
					description: (
						<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100 flex items-center gap-x-1.5">
							<Ban className="size-4" />
							{error.response?.data?.Reservation.errors?.[0]?.errorMessage}</div>
					),
					variant: "destructive",
					className: "dark:bg-red-600"
				})
			})
	}


	return <Dialog open={isOpen} onOpenChange={toggleOpen} >
		<DialogContent className="rounded-2xl w-[30vw] px-8">
			<form onSubmit={handleSubmit} className="space-y-3">
				<Label>Description</Label>
				<Textarea
					className=" rounded-lg focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-primary"
					placeholder="Ajouter un motif ou une observation de consultation"
					// className="resize-none"
					onChange={(e) => setForm({...form, Description: e.target.value})}
				/>

				<div className="grid justify-end">
					<Button
						onClick={toggleOpen}
						type="submit" size="sm" className="rounded-full hover:bg-secondary w-full  md:w-fit flex items-center gap-x-1.5 dark:text-white">
						<Check className="size-4" />
						Finish
					</Button>
				</div>
			</form>
		</DialogContent>
	</Dialog>


}