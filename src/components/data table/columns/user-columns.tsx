import { IUser } from "@/types/types"
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, Bookmark, MoreHorizontal, ShieldCheck, ShieldMinus, UserRoundCheck, UserRoundX} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import {Badge} from "@/components/ui/badge.tsx";
import {Link} from "react-router-dom";

export const columns: ColumnDef<IUser>[] = [
	{
		accessorKey: "FirstName",
		header: "First name",
	},
	{
		accessorKey: "LastName",
		header: "Last name",
	},
	{
		accessorKey: "Email",
		header: "Email",
	},
	{
		accessorKey: "IsActivated",
		header: "Activated",
		cell: props => <Badge variant="outline" className={cn(props.getValue() ? "bg-blue-200 dark:bg-blue-400 text-blue-700 dark:text-white" : "bg-gray-200 dark:bg-gray-400 text-gray-700 dark:text-white", "whitespace-nowrap border-0")} >{`${props.getValue() ? "Enabled" : "Disabled"}`}</Badge>
	},

	{
		accessorKey: "CreatedAt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Created at
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({row}) => <p className="font-medium">{row.original.CreatedAt?.toLocaleString()}</p>
	},
	{
		accessorKey: "VerifiedAt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Verified at
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({row}) => <p className="font-medium">{row.original.VerifiedAt?.toLocaleString()}</p>
	},
	{
		accessorKey: "IsApproved",
		header: "Approved",
		cell: props => <Badge variant="outline" className={cn(props.getValue() ? "bg-green-200 dark:bg-green-400 text-green-700 dark:text-white" : "bg-amber-200 dark:bg-amber-400 text-amber-700 dark:text-white", "whitespace-nowrap border-0")} >{`${props.getValue() ? "Approved" : "Pending"}`}</Badge>
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link className="flex items-center gap-x-1.5" to="">
								<Bookmark className="h-4 w-4"/>
								Reservations
							</Link>
						</DropdownMenuItem>
						{!user.IsApproved && <DropdownMenuItem className="flex items-center gap-x-1.5"><UserRoundCheck className="h-4 w-4"/>Approve</DropdownMenuItem>}
						{user.IsActivated && <DropdownMenuItem className="flex items-center gap-x-1.5"><ShieldMinus className="h-4 w-4"  />Disable</DropdownMenuItem>}
						{!user.IsActivated && <DropdownMenuItem className="flex items-center gap-x-1.5"><ShieldCheck className="h-4 w-4"  />Enable</DropdownMenuItem>}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex items-center gap-x-1.5 text-destructive focus:text-destructive">
							<UserRoundX className="h-4 w-4"  />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
