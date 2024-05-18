import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Expand} from "lucide-react";
import {cn} from "@/lib/utils.ts";


interface Props {
	ImagePath: string;
	className?: string;
}

export default function ({ImagePath, className}: Props) {
	return <div className={cn("", className)}>
		<Dialog>
			<DialogTrigger>
				<div className="hover:scale-105 ease-in-out transition-all">
					<Expand className="size-5" />
				</div>
			</DialogTrigger>
			<DialogContent className="p-0 ">
				<div className="rounded-xl">
					<img src={ImagePath} className="size-full object-cover rounded-xl"/>
				</div>

			</DialogContent>
		</Dialog>
	</div>
}