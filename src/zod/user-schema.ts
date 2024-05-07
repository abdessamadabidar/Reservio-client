import {z} from "zod";

export const userSchema = z.object({
	firstName: z.string({
		required_error: 'First name is required.'
	})
		.min(3, {message:'First name must be at least 3 characters long.'})
		.max(20, {message: 'First name must be less than 20 characters long.'})
		.regex(new RegExp('^[A-Za-z\\s-]+$'), {message: 'First name must not contain special characters.'})
		.toLowerCase(),


	lastName: z.string({
		required_error: 'Last name is required.'
	})
		.min(3, {message:'Last name must be at least 3 characters long.'})
		.max(20, {message: 'Last name must be less than 20 characters long.'})
		.regex(new RegExp('^[A-Za-z\\s-]+$'), {message: 'Last name must not contain special characters.'})
		.toLowerCase(),


	email: z.string({
		required_error: 'Email is required.'
	})
		.min(10, {message: 'Email must be at least 10 characters long.'})
		.max(50, {message: 'Email must be less than 50 characters long.'})
		.email().toLowerCase(),

	password: z.string({
		required_error: 'Password is required.'
	}).min(8, {message: "Password must be at least 8 characters long."}),
	passwordConfirmation: z.string({
		required_error: 'Password confirmation is required.'
	}).min(8),
})
