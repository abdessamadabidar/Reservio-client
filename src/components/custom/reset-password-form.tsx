import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {resetPasswordSchema} from "@/zod/reset-password-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export default function ResetPasswordForm() {

	const [passwordIsVisible, setPasswordIsVisible] = useState(false)
	const [passwordConfirmationIsVisible, setPasswordConfirmationIsVisible] = useState(false)


	const resetPasswordForm = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema)
	})
	const onSubmit = (data: ResetPasswordSchema) => {
		console.log(data)
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											{passwordIsVisible && <Button size="icon" variant="outline" className="border-0 absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            </Button>}
											{passwordIsVisible || <Button size="icon" variant="outline" className="border-0 absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </Button>}
											<Input {...field}  type={passwordIsVisible? "text" : "password"} className={cn("focus-visible:ring-primary")} />
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
											{passwordConfirmationIsVisible && <Button size="icon" variant="outline" className="border-0 absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent" onClick={() => setPasswordConfirmationIsVisible(!passwordConfirmationIsVisible)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            </Button>}
											{passwordConfirmationIsVisible || <Button size="icon" variant="outline" className="border-0 absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent" onClick={() => setPasswordConfirmationIsVisible(!passwordConfirmationIsVisible)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </Button>}
											<Input {...field} type={passwordConfirmationIsVisible? "text" : "password"} className={cn("focus-visible:ring-primary")} />
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