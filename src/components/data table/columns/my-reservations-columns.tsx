import {IReservation} from "@/types/types"
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react"

import { Button } from "@/components/ui/button"

import {format} from "date-fns";
import ReservationTableDropdown from "@/components/data table/reservation-table-dropdown.tsx";

export const columns: ColumnDef<IReservation>[] = [
	{
		accessorKey: "StartDateTime",
		header: "Start date",
		cell: ({row}) => <div className="font-medium">{format(row.original.StartDateTime, "yyyy-MM-d HH:mm a")}</div>
	},
	{
		accessorKey: "EndDateTime",
		header: "End date",
		cell: ({row}) => <div className="font-medium">{format(row.original.EndDateTime, "yyyy-MM-d HH:mm a")}</div>
	},
	{
		accessorKey: "Description",
		header: "Description",
		cell: ({row}) => {
			if (!row.original.Description) {
				return <div className="italic text-xs text-gray-400">-- No description --</div>
			}
			return <div>{row.original.Description}</div>
		}
	},

	{
		accessorKey: "Room.Name",
		header: "Room",
		cell: ({row}) => <div className="font-medium">{row.original.Room?.Name}</div>
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
		cell: ({row}) => <div className="font-medium">{format(row.original.CreatedAt, "yyyy-MM-d HH:mm a")}</div>
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const reservation = row.original;

			return <ReservationTableDropdown reservation={reservation} />
		},
	},
]
