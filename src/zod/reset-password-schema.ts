import {z} from "zod";

export const resetPasswordSchema = z.object({
	newPassword: z.string({
		required_error: 'Password is required.'
	}).min(8, {message: "Password must be at least 8 characters long."}),
	newPasswordConfirmation: z.string({
		required_error: 'Password is required.'
	}).min(8, {message: "Password confirmation must be at least 8 characters long."}),
	token: z.string({
		required_error: 'Token is required.'
	})
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;