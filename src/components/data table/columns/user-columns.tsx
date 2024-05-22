import { IUser } from "@/types/types"
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import {Badge} from "@/components/ui/badge.tsx";
import {format} from "date-fns";
import UserTableDropdown from "@/components/data table/user-table-dropdown.tsx";

export const columns: ColumnDef<IUser>[] = [
	{
		accessorKey: "FirstName",
		header: "First name",
		cell: ({row}) => <div>{row.original.FirstName?.charAt(0).toUpperCase() + row.original.FirstName?.slice(1)}</div>
	},
	{
		accessorKey: "LastName",
		header: "Last name",
		cell: ({row}) => <div>{row.original.LastName?.charAt(0).toUpperCase() + row.original.LastName?.slice(1)}</div>
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
		cell: ({row}) => <p className="font-medium">{format(row.original.CreatedAt!, 'yyyy-MM-dd HH:mm a')}</p>
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
		cell: ({row}) => {
			if(!row.original.VerifiedAt) return <p className="text-center text-xs italic">Not verified</p>
			return <p className="font-medium">{format(new Date(row.original.VerifiedAt!), 'yyyy-MM-dd HH:mm a')}</p>
		}
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

			return <UserTableDropdown user={user} />
		},
	},
]
