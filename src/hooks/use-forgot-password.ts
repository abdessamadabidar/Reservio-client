import {EmailSchema} from "@/zod/email-schema.ts";
import {useMutation} from "react-query";
import AuthApi from "@/API/auth-api.ts";
import {useNavigate} from "react-router-dom";
import {ResetPasswordSchema} from "@/zod/reset-password-schema.ts";


export const useForgotPassword = () => {


	const navigate = useNavigate();

	const {mutateAsync: forgotPasswordMutation, isLoading} = useMutation({
		mutationFn: async (email: EmailSchema) => await AuthApi.forgotPassword(email),
		onSuccess: (response) => {
			console.log(response.data)
			navigate('/auth/email-sent')
		},
		onError: (error) => {
			console.log('forgot password error', error)
		}
	})


	const {mutateAsync: resetPasswordMutation} = useMutation({
		mutationFn: (resetPasswordRequest: ResetPasswordSchema) => AuthApi.resetPassword(resetPasswordRequest),
		onSuccess: (response) => {
			console.log(response.data)
			navigate('/auth/login')
		},
		onError: (error) => {
			console.log('reset password error', error)
		}
	})

	const sendForgotPasswordEmail = async (email: EmailSchema) => forgotPasswordMutation(email);
	const resetPassword = async (resetPasswordRequest: ResetPasswordSchema) => resetPasswordMutation(resetPasswordRequest);

	return {sendForgotPasswordEmail, resetPassword, isLoading}
}