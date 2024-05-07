import AuthenticationPage from "@/pages/authentication-page.tsx";
import {LoginForm} from "@/components/custom/login-form.tsx";


export default function LoginPage() {
	return <AuthenticationPage form={<LoginForm />} />
}