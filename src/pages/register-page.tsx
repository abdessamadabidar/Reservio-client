import {RegisterForm} from "@/components/custom/register-form.tsx";
import AuthenticationPage from "@/pages/authentication-page.tsx";


export default function RegisterPage() {
	return <AuthenticationPage form={<RegisterForm />} />
}