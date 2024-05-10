import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Link, useLocation} from "react-router-dom";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {ResetPasswordSchema, passwordSchema} from "@/zod/password-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePassword} from "@/hooks/use-password.ts";
import {useForgotPassword} from "@/hooks/use-forgot-password.ts";
import {toast} from "@/components/ui/use-toast.ts";


export default function ResetPasswordForm() {


	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const token: string | null = query.get('token');


	const resetPasswordForm = useForm<ResetPasswordSchema>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			token: token
		}
	})


	const {
		passwordVisibility,
		confirmPasswordVisibility,
		togglePasswordVisibility,
		toggleConfirmPasswordVisibility,
		passwordMatches,
		setPassword,
		setConfirmPassword
	} = usePassword()


	const {resetPassword} = useForgotPassword()


	const onSubmit = (data: ResetPasswordSchema) => {

		resetPassword(data).then(response => {
			toast({
				description: (
					<div className="flex items-center gap-x-1.5">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>
						{response.data}
					</div>
				),
				className: "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 border-0",
			})
		}).catch(error => {
			toast({
				description: (
					<div className="flex items-center gap-x-1.5">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
						</svg>
						{error.response.data}
					</div>
				),
				className: "dark:text-red-600 border-0",
				variant: "destructive"
			})
		})

	}

	return <Card className="rounded-2xl border-0 dark:border shadow space-y-2">
		<CardHeader className="space-y-2">
			<CardTitle className="text-foreground text-center">Reset password</CardTitle>
			<CardDescription className="text-center">Remember your password? <Link to="/auth" className="text-primary font-semibold hover:underline" >Sign in here</Link></CardDescription>
		</CardHeader>
		<CardContent>
			<Form {...resetPasswordForm}>
				<form onSubmit={resetPasswordForm.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<FormField
							control={resetPasswordForm.control}
							name="password"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>New password</FormLabel>
									<FormControl>
										<div className="relative">
											{passwordVisibility && <Button size="icon" variant="outline" className="border-0 absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent" onClick={togglePasswordVisibility}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            </Button>}
											{passwordVisibility || <Button size="icon" variant="outline" className="border-0 absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent" onClick={togglePasswordVisibility}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </Button>}
											<Input {...field}  type={passwordVisibility? "text" : "password"} className={cn("focus-visible:ring-primary")} onChange={(event) => {
												field.onChange(event.target.value)
												setPassword(event.target.value)
											}} />
										</div>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<FormField
							control={resetPasswordForm.control}
							name="passwordConfirmation"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Password confirmation</FormLabel>
									<FormControl>
										<div className="relative">
											{confirmPasswordVisibility && <Button size="icon" variant="outline" className="border-0 absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent" onClick={toggleConfirmPasswordVisibility}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            </Button>}
											{confirmPasswordVisibility || <Button size="icon" variant="outline" className="border-0 absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent" onClick={toggleConfirmPasswordVisibility}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </Button>}
											<Input {...field} type={confirmPasswordVisibility? "text" : "password"} className={cn("focus-visible:ring-primary", !passwordMatches && "focus-visible:ring-destructive")} onChange={(event) => {
												field.onChange(event.target.value)
												setConfirmPassword(event.target.value)
											}} />
										</div>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full hover:bg-secondary dark:text-foreground">
							Reset password
						</Button>
					</div>
				</form>
			</Form>
		</CardContent>
	</Card>
}