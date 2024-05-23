import {useMutation} from "react-query";
import {UserSchema} from "@/zod/user-schema.ts";
import AuthApi from "@/API/auth-api.ts";
import {useNavigate} from "react-router-dom";


export const useRegistration = () => {


	const navigate = useNavigate();
	const {mutateAsync: registerMutation, isLoading } = useMutation({
		mutationFn: async (user: UserSchema) => await AuthApi.signUp(user),
		onSuccess: () => {
			navigate("/auth/login");
		},
		onError: (error) => {
			console.log('react query on error', error);
		}
	})
	const register = async (user: UserSchema) => {
		return await registerMutation(user)
	}

	return {register, isLoading}
}