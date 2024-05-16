import {IReservation} from "@/types/types"
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, BookmarkX, Info, MoreHorizontal, SquarePen} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Link} from "react-router-dom";
import {format} from "date-fns";

export const columns: ColumnDef<IReservation>[] = [
	{
		accessorKey: "User.FirstName",
		header: "First name",
	},
	{
		accessorKey: "User.LastName",
		header: "Last name",
	},
	{
		accessorKey: "StartDateTime",
		header: "Start date",
		cell: ({row}) => <div>{format(row.original.StartDateTime, "yyyy-MM-d HH:mm a")}</div>
	},
	{
		accessorKey: "EndDateTime",
		header: "End date",
		cell: ({row}) => <div>{format(row.original.EndDateTime, "yyyy-MM-d HH:mm a")}</div>
	},
	{
		accessorKey: "Description",
		header: "Description",
	},

	{
		accessorKey: "Room.Name",
		header: "Room",
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
		cell: ({row}) => <div>{format(row.original.StartDateTime, "yyyy-MM-d HH:mm a")}</div>
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const reservation = row.original;

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
							<Link className="flex items-center gap-x-1.5" to={`details/${reservation.Id}`}>
								<Info className="h-4 w-4"/>
								Details
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link className="flex items-center gap-x-1.5" to="">
								<SquarePen className="h-4 w-4"/>
								Edit
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex items-center gap-x-1.5 text-destructive focus:text-destructive">
							<BookmarkX className="h-4 w-4"  />
							Cancel
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
