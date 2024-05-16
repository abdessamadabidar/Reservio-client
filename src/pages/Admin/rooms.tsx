import {Button} from "@/components/ui/button.tsx";
import {CirclePlus} from "lucide-react";
import {Link} from "react-router-dom";

export default function Rooms() {
	return <div className="grid">
		<div className="flex items-center justify-end">
			<Link to="create-new-room">
				<Button className="rounded-lg hover:bg-secondary flex items-center gap-x-1.5 dark:text-white" size="sm">
					<CirclePlus className="size-4" />
					Add new room
				</Button>
			</Link>
		</div>
		<div className="mt-8 grid md:grid-cols-2 gap-5">


		</div>
	</div>
}