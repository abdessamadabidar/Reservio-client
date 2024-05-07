import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {z} from "zod";
import {emailSchema} from "@/zod/email-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {toast} from "@/components/ui/use-toast.ts";


type EmailSchema = z.infer<typeof emailSchema>;
export default function EmailForm() {


	const emailForm = useForm<EmailSchema>({
		resolver: zodResolver(emailSchema),
	})


	const onSubmit = (data: EmailSchema) => {
		console.log(data)
		toast({
			description: "Please check your email inbox.",
		})
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
										<Input  type="text" {...field} className={cn("focus-visible:ring-primary")}/>
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