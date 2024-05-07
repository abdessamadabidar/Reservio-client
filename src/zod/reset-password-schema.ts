import {z} from "zod";

export const resetPasswordSchema = z.object({
	password: z.string({
		required_error: 'Password is required.'
	}).min(8, {message: "Password must be at least 8 characters long."}),
	passwordConfirmation: z.string({
		required_error: 'Password confirmation is required.'
	}).min(8),
})