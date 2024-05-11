import {LoginSchema} from "@/zod/login-schema.ts";
import axiosInstance from "@/API/axios.ts";
import {UserSchema} from "@/zod/user-schema.ts";
import {EmailSchema} from "@/zod/email-schema.ts";
import {PasswordSchema} from "@/zod/password-schema.ts";


export default {
	signIn: async (credentials: LoginSchema) => {
		return await axiosInstance.post('/Auth/login', credentials)
	},
	signUp: async (user: UserSchema) => {
		return await axiosInstance.post('/Auth/register', user)
	},
	forgotPassword: async (email: EmailSchema) => {
		return await axiosInstance.post('/Auth/forgot-password', email)
	},
	resetPassword: async (resetPasswordRequest: PasswordSchema) => {
		return await axiosInstance.post('/Auth/reset-password', resetPasswordRequest)
	}
}