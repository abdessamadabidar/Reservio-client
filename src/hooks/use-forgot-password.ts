import {EmailSchema} from "@/zod/email-schema.ts";
import {useMutation} from "react-query";
import AuthApi from "@/API/auth-api.ts";
import {useNavigate} from "react-router-dom";
import {PasswordSchema} from "@/zod/password-schema.ts";


export const useForgotPassword = () => {


	const navigate = useNavigate();

	const {mutateAsync: forgotPasswordMutation, isLoading} = useMutation({
		mutationFn: async (email: EmailSchema) => await AuthApi.forgotPassword(email),
		onSuccess: (response) => {
			console.log(response.data)

		},
		onError: (error) => {
			console.log('forgot password error', error)
		}
	})


	const {mutateAsync: resetPasswordMutation} = useMutation({
		mutationFn: (resetPasswordRequest: PasswordSchema) => AuthApi.resetPassword(resetPasswordRequest),
		onSuccess: (response) => {
			console.log(response.data)
			navigate('/auth')
		},
		onError: (error) => {
			console.log('reset password error', error)
		}
	})

	const sendForgotPasswordEmail = async (email: EmailSchema) => forgotPasswordMutation(email);
	const resetPassword = async (resetPasswordRequest: PasswordSchema) => resetPasswordMutation(resetPasswordRequest);

	return {sendForgotPasswordEmail, resetPassword, isLoading}
}