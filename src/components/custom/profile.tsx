import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem, DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Link} from "react-router-dom";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";
import {useUser} from "@/hooks/use-user.ts";






export default function Profile() {

	const {id, firstName, lastName, email, isActivated, isApproved} = useSelector((state: RootState) => state.userState);
	const {enableAccount, disableAccount} = useUser(id);

	return (
		<Card className="md:w-[600px] mx-auto rounded-xl">
			<CardHeader className='border-b flex flex-row items-center justify-between py-2.5'>
				<div className="flex items-center flex-nowrap gap-x-2">
					<CardTitle className="text-lg">My account</CardTitle>
					<Badge variant="outline" className={cn("text-xs border-0", isActivated ? "bg-green-200 dark:bg-green-400 text-green-700 dark:text-white" : "bg-red-200 dark:bg-red-400 text-red-700 dark:text-white")}>{isActivated ? "Enabled" : "Disabled"}</Badge>
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
								<Link to="edit" className="flex flex-nowrap items-center gap-x-2 w-full">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
										<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
									</svg>
									Edit
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="gap-x-2" disabled={isActivated} onClick={enableAccount}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
								</svg>
								Enable
							</DropdownMenuItem>
							<DropdownMenuItem className="gap-x-2" disabled={!isActivated} onClick={disableAccount}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
								</svg>
								Disable
							</DropdownMenuItem>
							<DropdownMenuSeparator/>
							<DropdownMenuItem className="gap-x-2 text-red-500 focus:text-destructive dark:focus:text-red-600">
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
				<div className="grid space-y-4 gap-y-1">
					<div className="grid grid-cols-2 gap-x-2">
						<div className="text-sm space-y-2 col-span-1">
							<p className="font-medium">First name</p>
							<div className="border rounded-lg px-4 py-2.5 text-muted-foreground">{firstName}</div>
						</div>
						<div className="text-sm space-y-2 col-span-1">
							<p className="font-medium">Last name</p>
							<div className="border rounded-lg px-4 py-2.5 text-muted-foreground">{lastName}</div>
						</div>
					</div>
					<div className="text-sm space-y-2 col-span-1">
						<p className="font-medium">Email</p>
						<div className="border rounded-lg px-4 py-2.5 text-muted-foreground">{email}</div>
					</div>
					<div className="text-sm col-span-1">
						<div className="space-y-3 ">
							<h1 className="block text-sm font-medium">Approved</h1>
							<RadioGroup disabled className="flex flex-nowrap items-center gap-x-4">
								<div className="flex items-center space-x-2">
									<RadioGroupItem checked={isApproved} value="oui" id="r1" />
									<Label htmlFor="r1">Yes</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="non" checked={!isApproved} id="r2" />
									<Label htmlFor="r2">No</Label>
								</div>
							</RadioGroup>
						</div>

					</div>
					<div className="grid justify-end">
						<Link to="edit">
							<Button size="sm" className="hover:bg-secondary flex items-center gap-x-1 dark:text-white">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
								</svg>
								Edit
							</Button>
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}