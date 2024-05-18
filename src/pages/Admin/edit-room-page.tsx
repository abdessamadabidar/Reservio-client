import {useParams} from "react-router-dom";
import {useRoom} from "@/hooks/use-room.ts";
import EditRoomForm from "@/components/custom/edit-room-form.tsx";


export default function EditRoomPage() {

	const {roomId} = useParams<{roomId: string}>();
	const {room} = useRoom(roomId);

	return <EditRoomForm room={room} />
}