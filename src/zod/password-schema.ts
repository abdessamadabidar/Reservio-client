import {z} from "zod";

export const passwordSchema = z.object({
	oldPassword: z.string({
		required_error: 'Password is required.'
	}).min(8, {message: "Password must be at least 8 characters long."}),
	newPassword: z.string({
		required_error: 'Password is required.'
	}).min(8, {message: "Password confirmation must be at least 8 characters long."}),
})

export type PasswordSchema = z.infer<typeof passwordSchema>;