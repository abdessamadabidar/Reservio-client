import {LoginSchema} from "@/zod/login-schema.ts";
import axiosInstance from "@/API/axios.ts";


export default {
	signIn: async (credentials: LoginSchema) => {
		return await axiosInstance.post('/Auth/login', credentials)
	}
}