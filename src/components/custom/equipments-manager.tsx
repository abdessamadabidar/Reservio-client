import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Ban, CircleCheckBig, Plus, Save, SquareCheckBig, SquarePen, X} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {useState} from "react";
import {IEquipment} from "@/types/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {useEquipment} from "@/hooks/use-equipment.ts";
import {SmallLoader} from "@/components/custom/small-loader.tsx";
import {useRoom} from "@/hooks/use-room.ts";
import {toast} from "@/components/ui/use-toast.ts";


interface Props {
	roomId: string;
	roomEquipments: IEquipment[];
}



export default function EquipmentsManager({roomId, roomEquipments}: Props) {


	const {equipments: Equipments, equipmentsAreLoading} = useEquipment();
	const {updateEquipments} = useRoom(roomId);
	const AddEquipment = (equipment: IEquipment) => {
		// Check if equipment is already added
		const isAdded = selectedEquipments.some((item) => item.Id === equipment.Id);
		if (isAdded) return;
		setSelectedEquipments((prev) => [...prev, equipment]);
		// remove equipment from equipments list
		setEquipments((prev) => prev.filter((item) => item.Id !== equipment.Id));

	}

	const RemoveEquipment = (equipment: IEquipment) => {
		const isRemoved = equipments.some((item) => item.Id === equipment.Id);
		if (isRemoved) return;
		setEquipments((prev) => [...prev, equipment]);
		setSelectedEquipments((prev) => prev.filter((item) => item.Id !== equipment.Id));
	}




	const handleUpdateEquipments = async (equipments: IEquipment[]) => {

		const Ids: string[] =  equipments?.map((equipment) => equipment?.Id) as string[];
		await updateEquipments(Ids)
			.then((response) => {
				toast({
					description: (
						<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100 flex items-center gap-x-1.5">
							<CircleCheckBig className="size-4" />
							{response.data.toString()}
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
							{error.response.data.toString()}</div>
					),
					variant: "destructive",
					className: "dark:bg-red-600"
				})
			})


	}


	const [selectedEquipments, setSelectedEquipments] = useState<IEquipment[]>(roomEquipments);
	const initialEquipments = Equipments?.filter(
		equipment => !selectedEquipments?.some(selectedEquipment => selectedEquipment?.Id === equipment?.Id)
	);

	const [equipments, setEquipments] = useState(initialEquipments);





	return <Card className="px-5 md:w-[70%] lg:w-[50%] rounded-xl mx-auto">
		<CardHeader className="px-0 md:px-6">
			<CardTitle className="text-primary text-lg flex items-center">
				<SquarePen className="size-4 mr-2" />
				Manage room equipments
			</CardTitle>
		</CardHeader>
		<CardContent className="px-0 md:px-6 space-y-8">
			<div className="text-center">
				{(equipmentsAreLoading) && <SmallLoader />}
				<div className="flex flex-wrap gap-x-3 gap-y-2.5">
					{equipments?.map((equipment) => <Badge key={equipment?.Id} variant="outline" className="space-x-2 hover:bg-muted">
						<span>{equipment?.Name}</span>
						<button onClick={() => {AddEquipment(equipment)}}><Plus className="size-3" /></button>
					</Badge>)}
				</div>
			</div>
			<div className=" space-y-3">
				<div className="text-sm font-medium text-primary flex items-center gap-x-1.5">
					<SquareCheckBig className="size-3.5"/>
					Added equipments</div>
				<div className="flex flex-wrap gap-x-3 gap-y-2.5 border border-dashed p-3 md:p-5 rounded-xl">
					{selectedEquipments?.map((equipment) => <Badge key={equipment?.Id} variant="outline" className="space-x-2 hover:bg-muted">
							<span>{equipment?.Name}</span>
							<button onClick={() => RemoveEquipment(equipment)}><X className="size-3" /></button>
						</Badge>)}
					{selectedEquipments?.length == 0 && <div className="text-muted-foreground text-xs italic">No equipments added</div>}
				</div>
			</div>
		</CardContent>
		<CardFooter className="justify-end">
			<Button
				onClick={handleUpdateEquipments.bind(null, selectedEquipments)}
				size="sm"
				className="w-full md:w-32 hover:bg-secondary rounded-full flex items-center gap-x-1.5">
				<Save className="size-4" />
				Save</Button>
		</CardFooter>
	</Card>
}