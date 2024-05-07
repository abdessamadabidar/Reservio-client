import EmailForm from "@/components/custom/email-form.tsx";

export default function ForgotPasswordPage() {
	return <div className="h-screen grid place-items-center">
		<div className="flex flex-col gap-8 w-[25vw]">
			<div className="text-2xl font-bold font-shrikhand text-primary tracking-wider text-center">Reservio</div>
			<EmailForm />
		</div>
	</div>
}