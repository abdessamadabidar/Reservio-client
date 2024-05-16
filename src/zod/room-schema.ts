import {z} from "zod";


export const roomSchema = z.object({
	Name: z.string({
		required_error: "Room name is required"
	}).min(4, "Room name  must be at least 4 characters long.")
		.max(20, "Room name must be less than 20 characters long."),


	Capacity: z.coerce.number({
		required_error: "Room capacity is required"
	}).min(1),

	Description: z.string().optional(),

	Equipments: z.array(z.object({
		Id: z.string(),
		Name: z.string()
	})),
	ImageFile:z.custom<File>().nullable(),
})