import {z} from "zod";
import {searchRoomsSchema} from "@/zod/search-rooms-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command.tsx";
import {CalendarIcon, CheckIcon, ClockIcon} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {Calendar} from "@/components/ui/calendar.tsx";
import {format} from "date-fns";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup, DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useState} from "react";


type SearchRoomsSchema = z.infer<typeof searchRoomsSchema>
const rooms: string[] = [
	"ROOM1",
	"ROOM2",
	"ROOM3"
]

export default function SearchRoomsForm() {

	const [time, setTime] = useState<string>()

	const searchRoomsForm = useForm<SearchRoomsSchema>({
		resolver: zodResolver(searchRoomsSchema)
	})

	const onSubmit = (data: SearchRoomsSchema) => {
		console.log(data)
	}

	return <div>
		<Form {...searchRoomsForm}>
			<form onSubmit={searchRoomsForm.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
					<FormField
						control={searchRoomsForm.control}
						name="roomName"
						render={({ field }) => (
							<FormItem className="flex flex-col justify-end col-span-2 md:col-span-1">
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													"justify-between font-normal w-full bg-white dark:bg-background h-12 rounded-xl shadow-sm",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value
													? rooms.find(
														(room) => room === field.value
													)
													: "Select room"}
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 h-4 w-4 shrink-0 opacity-50 text-primary">
													<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
												</svg>
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="p-0 rounded-xl  shadow-sm">
										<Command className="rounded-xl ">
											<CommandInput
												placeholder="Search room..."
												className="h-9 "
											/>
											<CommandEmpty>No room found.</CommandEmpty>
											<CommandGroup>
												{rooms.map((room, index) => (
													<CommandItem
														value={room}
														key={index}
														onSelect={() => {
															searchRoomsForm.setValue("roomName", room)
														}}
														className="rounded-lg"
													>
														{room}
														<CheckIcon
															className={cn(
																"ml-auto h-4 w-4",
																room === field.value
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage className="text-xs font-normal" />
							</FormItem>
						)}
					/>
					<FormField
						control={searchRoomsForm.control}
						name="date"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full col-span-1">
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													" pl-3 text-left font-normal bg-white dark:bg-background h-12 rounded-xl shadow-sm",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-primary" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0 rounded-xl shadow-sm" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => date < new Date()}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>
					<FormField
						control={searchRoomsForm.control}
						name="startTime"
						render={({ field }) => (
							<FormItem className="flex flex-col col-span-1">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className={
											cn(" pl-3 text-left font-normal bg-white dark:bg-background h-12 rounded-xl shadow-sm",
												!time && "text-muted-foreground"

										)}>
											{time || "Time"}
											<ClockIcon className="ml-auto h-4 w-4 opacity-50 text-primary" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="md:w-64 rounded-xl shadow-sm">
										<FormControl>
											<DropdownMenuRadioGroup value={time} onValueChange={(value) => { setTime(value); field.onChange }}>
												<DropdownMenuRadioItem value="08:00:00-10:00:00" className="flex items-center justify-evenly ">
													<span>08:00</span>-<span>10:00</span>
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="10:00:00-12:00:00" className="flex items-center justify-evenly ">
													<span>10:00</span>-<span>12:00</span>
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="12:00:00-14:00:00" className="flex items-center justify-evenly ">
													<span>12:00</span>-<span>14:00</span>
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="14:00:00-16:00:00" className="flex items-center justify-evenly ">
													<span>14:00</span>-<span>16:00</span>
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="16:00:00-18:00:00" className="flex items-center justify-evenly ">
													<span>16:00</span>-<span>18:00</span>
												</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
										</FormControl>
									</DropdownMenuContent>
								</DropdownMenu>
							</FormItem>
						)}
					/>
					<Button type="submit" className="h-12 col-span-2 md:col-span-1 px-6 rounded-xl hover:bg-secondary flex items-center gap-x-2 border border-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
							<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>
						Search
					</Button>
				</div>
			</form>
		</Form>
	</div>
}