import {Link} from "react-router-dom"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {LoginSchema, loginSchema} from "@/zod/login-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {cn} from "@/lib/utils.ts";
import {useAuthentication} from "@/hooks/use-authentication.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {Loader} from "@/components/custom/loader.tsx";



export function LoginForm() {
	const [passwordIsVisible, setPasswordIsVisible] = useState(false)

	const loginForm = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			rememberMe: false
		}
	})


	const {login, isLoading} = useAuthentication()

	const onSubmit = (data: LoginSchema) => {
		login(data).then((res) => {
			toast({
				title: "Sign up",
				description: (
					<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100">You have logged in successfull</div>
				),
				className: "bg-green-500 border-0 text-slate-100"
			})

		}).catch((error) => {
			toast({
				title: "Sign in",
				description: (
					<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100">{error.response.data}</div>
				),
				variant: "destructive",
				className: "dark:bg-red-600"
			})

		})
	}

	if(isLoading) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>

	}
	
	return (
		<div>
			<div className="mb-8">
				<h1 className="text-2xl font-bold">Sign in to your account</h1>
			</div>
			<Form {...loginForm}>
				<form onSubmit={loginForm.handleSubmit(onSubmit)}>
					<div className="grid gap-3">
						<FormField
							control={loginForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input  type="text" {...field} className={cn("focus-visible:ring-primary")}/>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<FormField
							control={loginForm.control}
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
											<Input {...field}  type={passwordIsVisible? "text" : "password"} className="focus-visible:ring-primary"  />
										</div>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<div className="flex justify-between items-center py-2.5 ">
							<FormField
								control={loginForm.control}
								name="rememberMe"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className="font-normal">
											Remember me
										</FormLabel>
									</FormItem>
								)}
							/>
							<Link to="/forgot-password" className="font-semibold text-sm text-primary hover:underline">Forgot password?</Link>
						</div>
						
						<Button type="submit" className="w-full hover:bg-secondary dark:text-foreground">
							sign in
						</Button>
					</div>

				</form>
			</Form>
			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/register" className="underline">
					Sign up
				</Link>
			</div>
		</div>
	)
}