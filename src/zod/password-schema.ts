import {z} from "zod";

export const passwordSchema = z.object({
	password: z.string({
		required_error: 'Password is required.'
	}).min(8, {message: "Password must be at least 8 characters long."}),
	passwordConfirmation: z.string({
		required_error: 'Password confirmation is required.'
	}).min(8, {message: "Password confirmation must be at least 8 characters long."}),
	token: z.string().nullable()
}).refine((data) => data.password === data.passwordConfirmation, {
	message: "Passwords don't match",
	path: ["passwordConfirmation"],
});

export type PasswordSchema = z.infer<typeof passwordSchema>;