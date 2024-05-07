import {z} from "zod";


export const loginSchema = z.object({
	email: z.string(
		{
			required_error: "Email is required"
		}
	).email().toLowerCase(),
	password: z.string({
		required_error: "Password is required"
	}).min(8, {message: "Password must be at least 8 characters long."}),
	rememberMe: z.boolean().default(false).optional()
})