import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {PasswordSchema, passwordSchema} from "@/zod/password-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePassword} from "@/hooks/use-password.ts";
import {useUser} from "@/hooks/use-user.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";


export default function ChangePasswordForm() {

	const {id} = useSelector((state: RootState) => state.userState)

	const changePasswordForm = useForm<PasswordSchema>({
		resolver: zodResolver(passwordSchema),
		
	})


	const {
		passwordVisibility,
		confirmPasswordVisibility,
		togglePasswordVisibility,
		toggleConfirmPasswordVisibility,
	} = usePassword()



	const {changePassword} = useUser(id);



	const onSubmit = (data: PasswordSchema) => {
		const {oldPassword, newPassword} = data;
		changePassword({oldPassword, newPassword})
			.then((response) => {
				console.log('Password changed successfully', response)
			})
			.catch((error) => {
				console.log('Error changing password', error)
			})
	}

	return <Card className="rounded-2xl border-0 dark:border shadow space-y-2">
		<CardHeader className="space-y-2">
			<CardTitle className="text-foreground text-center md:text-start text-lg flex items-center gap-x-2">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
				</svg>


				Change your password</CardTitle>
		</CardHeader>
		<CardContent>
			<Form {...changePasswordForm}>
				<form onSubmit={changePasswordForm.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<FormField
							control={changePasswordForm.control}
							name="oldPassword"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Old password</FormLabel>
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
											<Input {...field}  type={passwordVisibility? "text" : "password"} className={cn("focus-visible:ring-primary")}  />
										</div>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<FormField
							control={changePasswordForm.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>New Password</FormLabel>
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
											<Input {...field} type={confirmPasswordVisibility? "text" : "password"} className={cn("focus-visible:ring-primary")} />
										</div>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<div className="grid justify-end">
							<Button type="submit" className="w-full md:w-fit hover:bg-secondary dark:text-foreground">
								Confrim
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</CardContent>
	</Card>
}