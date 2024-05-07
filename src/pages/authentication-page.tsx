import {ReactNode} from "react";
import {ModeToggle} from "@/components/Theme/mode-toggle.tsx";

interface Props {
	form: ReactNode
}

export default function AuthenticationPage({form} : Props) {
	return (
		<div className="h-screen relative">
			<div className="absolute p-5">
				<ModeToggle />
			</div>
			<div className="grid md:grid-cols-5 h-full ">
				<div className="col-span-2 self-center">
					{/* TODO - Add login or register form */}
					<div className="h-full w-full px-8 md:px-24 my-auto">
						<div className="text-2xl font-bold font-shrikhand text-primary tracking-wider mb-6">Reservio</div>
						{form}
					</div>
				</div>
				<div className="col-span-3 hidden md:block">
					<div className="w-full h-full">
						<div className="hidden md:block bg-[url('src/assets/adrien-olichon-1aIwLqshekQ-unsplash.jpg')] h-full bg-no-repeat bg-center bg-cover"></div>
					</div>
				</div>
			</div>
		</div>
	);
}