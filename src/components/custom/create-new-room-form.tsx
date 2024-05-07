import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {z} from "zod";
import {roomSchema} from "@/zod/room-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {equipments} from "@/static/data/equipments.ts";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useEffect, useState} from "react";
import {IEquipment} from "@/types/types.ts";
import {toast} from "@/components/ui/use-toast.ts";

type RoomSchema = z.infer<typeof roomSchema>;
export default function CreateNewRoomForm() {
	const roomForm = useForm<RoomSchema>({
		resolver: zodResolver(roomSchema)
	})


	useEffect(() => {
		console.log(roomForm.formState.errors)
	}, [roomForm.formState.errors])
	const onSubmit = (data: RoomSchema) => {
		console.log(data)
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
			),
		})
	}

	const [selectedEquipments, setSelectedEquipments] = useState<Set<IEquipment>>(new Set());

	return <Card className="px-5 md:w-[60%] lg:w-[50%] rounded-xl mx-auto">
		<CardHeader className="px-0 md:px-6">
			<CardTitle>Create new room</CardTitle>
			<CardDescription className="ml-1">Please insert room infos</CardDescription>
		</CardHeader>
		<CardContent className="px-0 md:px-6">
			<Form {...roomForm}>
				<form onSubmit={roomForm.handleSubmit(onSubmit)}>
					<div className="grid gap-y-3">
						<div className="grid md:grid-cols-2 gap-y-5 md:gap-x-2">
							<FormField
								control={roomForm.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input  type="text" {...field} className={cn("focus-visible:ring-primary rounded-lg")}/>
										</FormControl>
										<FormMessage className="text-xs font-medium" />
									</FormItem>
								)}
							/>
							<FormField
								control={roomForm.control}
								name="capacity"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Capacity</FormLabel>
										<FormControl>
											<Input  type="number" min={1} {...field} className={cn("focus-visible:ring-primary rounded-lg")}/>
										</FormControl>
										<FormMessage className="text-xs font-medium" />
									</FormItem>
								)}
							/>
							<FormField
								control={roomForm.control}
								name="equipments"
								render={({ field }) => (
									<FormItem className="flex flex-col col-span-1">
										<FormLabel className="mb-1.5">Equipments</FormLabel>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="outline" className="text-muted-foreground font-normal">
													Select equipments
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="rounded-xl shadow-sm ">
												<FormControl>
													<ToggleGroup type="multiple" onValueChange={(value) => {
														const equipments = value.map((equipment) => JSON.parse(equipment)) as IEquipment[]
														setSelectedEquipments(new Set(equipments))
														field.onChange(equipments)
													}}>
														<ScrollArea className="flex flex-wrap w-96 h-60">
															{equipments.map((equipment) => (
																<ToggleGroupItem variant="outline" className={cn("font-normal m-1")} key={equipment.Id} value={JSON.stringify(equipment)}>
																	{equipment.Name}
																</ToggleGroupItem>
															))}
														</ScrollArea>
													</ToggleGroup>
												</FormControl>
											</DropdownMenuContent>
										</DropdownMenu>
									</FormItem>
								)}
							/>
							<FormField
								control={roomForm.control}
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Image</FormLabel>
										<FormControl>
											<Input  type="file" {...field} className={cn("focus-visible:ring-primary rounded-lg")}/>
										</FormControl>
										<FormMessage className="text-xs font-medium" />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="grid md:justify-end mt-5">
						<Button type="submit" className="hover:bg-secondary rounded-lg">Create Room</Button>
					</div>
				</form>
			</Form>
		</CardContent>
	</Card>
}