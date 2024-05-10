import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {EmailSchema, emailSchema} from "@/zod/email-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {toast} from "@/components/ui/use-toast.ts";
import {useForgotPassword} from "@/hooks/use-forgot-password.ts";
import {Loader} from "@/components/custom/loader.tsx";



export default function EmailForm() {


	const emailForm = useForm<EmailSchema>({
		resolver: zodResolver(emailSchema),
	})

	const {sendForgotPasswordEmail, isLoading} = useForgotPassword()

	const onSubmit = (data: EmailSchema) => {

		sendForgotPasswordEmail(data).then(response => {
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

	if(isLoading) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>

	}

	return <Card className="rounded-2xl border-0 dark:border shadow space-y-2">
		<CardHeader className="space-y-2">
			<CardTitle className="text-foreground text-center">Forgot password?</CardTitle>
			<CardDescription className="text-center">Remember your password? <Link to="/auth" className="text-primary font-semibold hover:underline" >Sign in here</Link></CardDescription>
		</CardHeader>
		<CardContent>
			<Form {...emailForm}>
				<form onSubmit={emailForm.handleSubmit(onSubmit)}>
					<div className="space-y-5">
						<FormField
							control={emailForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<div className="relative">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 absolute right-3 top-1/2 -translate-y-1/2">
												<path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
												<path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
											</svg>
											<Input  type="text" {...field} className={cn("focus-visible:ring-primary")}/>
										</div>

									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full hover:bg-secondary dark:text-foreground">
							Send
						</Button>
					</div>
				</form>
			</Form>
		</CardContent>
	</Card>;
}