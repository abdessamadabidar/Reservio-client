import {LoginSchema} from "@/zod/login-schema.ts";
import axiosInstance from "@/API/axios.ts";
import {UserSchema} from "@/zod/user-schema.ts";


export default {
	signIn: async (credentials: LoginSchema) => {
		return await axiosInstance.post('/Auth/login', credentials)
	},
	signUp: async (user: UserSchema) => {
		return await axiosInstance.post('/Auth/register', user)
	}
}