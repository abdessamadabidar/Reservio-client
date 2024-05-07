import {z} from "zod";

export const searchRoomsSchema = z.object({
	roomName: z.string(),
	date: z.date(),
	startTime: z.string(),
	endTime: z.string()
})