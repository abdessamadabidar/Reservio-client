import {useQuery} from "react-query";
import EquipmentApi from "@/API/equipment-api.ts";
import {IEquipment} from "@/types/types.ts";


export const useEquipment = () => {


	const {data: equipments} = useQuery({
		queryKey: ["equipments"],
		queryFn: async () => await EquipmentApi.fetchEquipments(),
		onSuccess: (response) => {
			console.log('Equipments fetched successfully', response)
		},
		onError: (error) => {
			console.log('Error fetching equipments', error)
		}

	})

	const Equipments = equipments?.data.map((equipment: { id: string; name: string; }) => {
		return {
			Id: equipment.id,
			Name: equipment.name
		}
	}) as IEquipment[];



	return {equipments: Equipments}
}