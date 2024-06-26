import {IReservation} from "@/types/types"
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react"

import { Button } from "@/components/ui/button"
import {format} from "date-fns";
import ReservationTableDropdown from "@/components/data table/reservation-table-dropdown.tsx";

export const columns: ColumnDef<IReservation>[] = [
	{
		accessorKey: "User.FirstName",
		header: "First name",
		cell: ({row}) => <div>{row.original.User?.FirstName?.charAt(0).toUpperCase() + row.original.User?.FirstName?.slice(1)}</div>
	},
	{
		accessorKey: "User.LastName",
		header: "Last name",
		cell: ({row}) => <div>{row.original.User?.LastName?.charAt(0).toUpperCase() + row.original.User?.LastName?.slice(1)}</div>
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
		cell: ({row}) => {
			if (!row.original.Description) {
				return <div className="italic text-xs">-- No description --</div>
			}
			return <div>{row.original.Description}</div>
		}
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
		cell: ({row}) => <div>{format(row.original.CreatedAt, "yyyy-MM-d HH:mm a")}</div>
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const reservation = row.original;
			return <ReservationTableDropdown reservation={reservation} />
		},
	},
]
