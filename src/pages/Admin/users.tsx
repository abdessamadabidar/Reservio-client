import {DataTable} from "@/components/data table/data-table.tsx";
import {columns} from "@/components/data table/columns/user-columns.tsx";
import {useUser} from "@/hooks/use-user.ts";
import {Loader} from "@/components/custom/loader.tsx";


export function Users() {

	const {allUsers, usersAreLoading} = useUser();


	if (usersAreLoading) {
		return <div className="absolute top-0 left-0 w-full h-screen bg-background">
			<Loader />
		</div>
	}

	return <div className="">
		<DataTable columns={columns} data={allUsers} />
	</div>
}
