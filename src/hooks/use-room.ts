import {useMutation, useQuery, useQueryClient} from "react-query";
import {IEquipment, IRoom, IRoomAvailability, IRoomRequest} from "@/types/types.ts";
import RoomApi from "@/API/room-api.ts";
import {format} from "date-fns";



export const useRoom = (roomId?: string, date?: Date) => {
	const queryClient = useQueryClient();

	const {mutateAsync: insertRoomMutation} = useMutation({

		mutationFn: async (room: IRoomRequest) => RoomApi.createRoom(room),
		onSuccess: (response) => {
			console.log('Room created successfully', response)
		},

		onError: (error) => {
			console.error('Room creation error', error)
		}

	})



	const {data: rooms, isLoading:fetchRoomsIsLoading} = useQuery({
		queryKey: ['rooms'],
		queryFn: async () => await RoomApi.fetchAllRooms(),

		onSuccess: (response) => {
			console.log('Rooms fetched successfully', response)
		},

		onError: (error) => {
			console.error('Rooms fetch error', error)

		}

	})


	const Rooms: IRoom[] = rooms?.data.map((room) => {
		return {
			Id: room.id,
			Name: room.name,
			Description: room.description,
			Capacity: room.capacity,
			ImagePath: room.imagePath,
			CreatedAt: room.createdAt,
			RoomEquipments: room?.roomEquipments?.map((Equipment: { id: string; name: string; }) => {

				return {
				Id: Equipment?.equipment.id,
				Name: Equipment?.equipment.name
			}
		}) as IEquipment[]
		}
	}) as IRoom[];


	const {data: room, isLoading:fetchRoomIsLoading} = useQuery({
		queryKey: ['room', roomId],
		queryFn: async () => await RoomApi.getRoomById(roomId!),
		onSuccess: async (response) => {
			console.log('Room fetched successfully', response)
		},
		onError: (error) => {
			console.error('Room fetch error', error)
		}

	})

	const Room: IRoom = {
		Id: room?.data.id,
		Name: room?.data.name,
		Description: room?.data.description,
		Capacity: room?.data.capacity,
		ImagePath: room?.data.imagePath,
		CreatedAt: room?.data.createdAt,
		RoomEquipments: room?.data?.roomEquipments?.map((Equipment: { id: string; name: string; }) => {
			return {
				Id: Equipment?.equipment.id,
				Name: Equipment?.equipment.name
			}
		}) as IEquipment[]
	}


	const {mutateAsync: deleteRoomMutation} = useMutation({
		mutationFn: async (roomId: string) => await RoomApi.removeRoom(roomId),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries(['rooms'])
			console.log('Room deleted successfully', response)
		},
		onError: (error) => {
			console.error('Room deletion error', error)
		}
	});

	const {data: availabilities} = useQuery({
		queryKey: ['room-availabilities', date],
		queryFn: async () => await RoomApi.fetchRoomAvailability(roomId!, date.toLocaleDateString()),
		onSuccess: (response) => {
			console.log('Room availabilities fetched successfully', response)
		},
		onError: (error) => {
			console.error('Room availabilities fetch error', error)
		}

	});

	const Availabilities : IRoomAvailability[] = availabilities?.data.map((availability) => {
		return {
			RoomId: availability?.roomId,
			StartTime: format(availability?.startDateTime, 'HH:mm a'),
			EndTime: format(availability?.endDateTime, 'HH:mm a')
		}
	}) as IRoomAvailability[];

	const deleteRoom = async (roomId: string) => await deleteRoomMutation(roomId);
	const insertRoom = async (room: IRoomRequest) => await insertRoomMutation(room);


	return {insertRoom, fetchRoomIsLoading, fetchRoomsIsLoading, rooms: Rooms, room: Room, deleteRoom, availabilities: Availabilities}

}