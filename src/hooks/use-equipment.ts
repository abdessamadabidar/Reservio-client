import {useQuery} from "react-query";
import EquipmentApi from "@/API/equipment-api.ts";
import {IEquipment} from "@/types/types.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";


export const useEquipment = () => {


	const token = useSelector((state: RootState) => state.userState.token)

	const {data: equipments, isLoading: equipmentsAreLoading} = useQuery({
		queryKey: ["equipments"],
		queryFn: async () => await EquipmentApi.fetchEquipments(token),
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



	return {equipments: Equipments, equipmentsAreLoading}
}