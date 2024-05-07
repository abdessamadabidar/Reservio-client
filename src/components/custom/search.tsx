import { Input } from "@/components/ui/input.tsx"
import {cn} from "@/lib/utils.ts";

interface SearchProps {
	placeholder?: string,
	value?: string | number,
	onChange: (query: string) => void,
	className?: string
}

function Search({placeholder, value, onChange, className} : SearchProps) {
	return (
		<div className="w-full">
			<Input
				type="search"
				placeholder={placeholder}
				value={value}
				className={cn("focus-visible:ring-primary", className)}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	)
}

export default Search