import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {MoreHorizontal} from "lucide-react";
import {Link} from "react-router-dom";
import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils.ts";
import {IUserUpdateRequest} from "@/types/types.ts";
import {UserSchema} from "@/zod/user-schema.ts";
import {useForm} from "react-hook-form";
import {useUser} from "@/hooks/use-user.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";


export default function EditProfile() {

	const userState = useSelector((state: RootState) => state.userState);

	const userForm = useForm<UserSchema>({
		defaultValues: {...userState}
	});

	const {id} = useSelector((state: RootState) => state.userState);


	const {updateUser} = useUser(id);

	const onsubmit = (data: UserSchema) => {



		const userUpdateRequest : IUserUpdateRequest = {
			id: userState.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
		}

		updateUser(userUpdateRequest).then((response) => {
			toast({
				title: "Update profile",
				description: (
					<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100">{response.data}</div>
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
		});

	}

	return <Card className="w-[600px] mx-auto">
		<CardHeader className='border-b flex flex-row items-center justify-between py-2.5'>
			<div className="flex items-center flex-nowrap gap-x-2">
				<CardTitle className="text-lg">Edit your information</CardTitle>
				<Badge variant="outline" className={cn("text-xs border-0", userState.isActivated ? "bg-green-200 dark:bg-green-400 text-green-700 dark:text-white" : "bg-red-200 dark:bg-red-400 text-red-700 dark:text-white")}>{userState.isActivated ? "Enabled" : "Disabled"}</Badge>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger className="focus-visible:ring-1 focus-visible:ring-offset-0" asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open the menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem >
							<Link to="/edit-user" className="flex flex-nowrap items-center gap-x-2 w-full">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
								</svg>
								Edit
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="gap-x-2" disabled={userState.isActivated}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>
							Enable
						</DropdownMenuItem>
						<DropdownMenuItem className="gap-x-2" disabled={!userState.isActivated}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
							</svg>
							Disable
						</DropdownMenuItem>
						<DropdownMenuSeparator/>
						<DropdownMenuItem className="gap-x-2 text-red-500">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
							</svg>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="py-6">
			<Form {...userForm}>
				<form onSubmit={userForm.handleSubmit(onsubmit)}>
					<div className="grid space-y-4">
						<div className="grid grid-cols-2 gap-x-2">
							<FormField
								control={userForm.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input type="text" {...field}/>
										</FormControl>
										<FormMessage className="text-xs font-normal" />
									</FormItem>
								)}
							/>
							<FormField
								control={userForm.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input  type="text" {...field}/>
										</FormControl>
										<FormMessage className="text-xs font-normal" />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={userForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input  type="text" {...field}/>
									</FormControl>
									<FormMessage className="text-xs font-normal" />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid justify-end mt-5">
						<Button size="sm" className="hover:bg-secondary text-white flex flex-nowrap items-center gap-x-1" disabled={!userForm.formState.isDirty}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
							</svg>
							Update
						</Button>
					</div>
				</form>
			</Form>

		</CardContent>
	</Card>

}