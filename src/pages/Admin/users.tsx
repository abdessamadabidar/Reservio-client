import {DataTable} from "@/components/data table/data-table.tsx";
import {columns} from "@/components/data table/columns/user-columns.tsx";
import {users} from "@/static/data/users.ts";


export function Users() {
	return <div className="">
		<DataTable columns={columns} data={users} />
	</div>
}
