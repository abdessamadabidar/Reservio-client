import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {RoomSchema, roomSchema} from "@/zod/room-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useRef, useState} from "react";
import {IEquipment, IRoomRequest} from "@/types/types.ts";

import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Ban, CircleCheckBig, CirclePlus, RefreshCw, Upload} from "lucide-react";
import {useEquipment} from "@/hooks/use-equipment.ts";
import {useRoom} from "@/hooks/use-room.ts";
import {toast} from "@/components/ui/use-toast.ts";





export default function CreateRoomForm() {
	const roomForm = useForm<RoomSchema>({
		resolver: zodResolver(roomSchema),
	})


	const {equipments} = useEquipment();

	useEffect(() => {
		console.log(roomForm.formState.errors)
	}, [roomForm.formState.errors])


	const {insertRoom} = useRoom();

	const onSubmit = (data: RoomSchema) => {
		const {ImageFile, Name, Description, Capacity, Equipments} = data;

		const roomRequest : IRoomRequest  = {
			Name: Name,
			Capacity: Capacity,
			Description: Description,
			Equipments: Equipments,
			ImageFile: ImageFile
		}

		insertRoom(roomRequest)
			.then((response) => {
				toast({
					description: (
						<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100 flex items-center gap-x-1.5">
							<CircleCheckBig className="size-4" />
							{response.data.toString()}
						</div>
					),
					className: "bg-green-600 border-0 text-slate-100"
				})
			})
			.catch(() => {
				toast({
					description: (
						<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100 flex items-center gap-x-1.5">
							<Ban className="size-4" />
							Error while creating room
						</div>
					),
					variant: "destructive",
					className: "dark:bg-red-600"
				})
			});


	}






	const [currentImageFile, setCurrentImageFile] = useState<File>(new File([], ''))
	const [previewImage, setPreviewImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		roomForm.setValue('ImageFile', currentImageFile)
	}, [currentImageFile])


	const selectImage = (event: React.ChangeEvent<HTMLInputElement>) : void => {
		if (!event.target.files || event.target.files.length === 0) {
			return;
		}
		const selectedFile = event.target.files[0];
		setCurrentImageFile(selectedFile);
		setPreviewImage(URL.createObjectURL(selectedFile));
	};



	const handleReselectImage = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};



	const [selectedEquipments, setSelectedEquipments] = useState<Set<IEquipment>>(new Set());
	return <Card className="px-5 md:w-[60%] lg:w-[50%] rounded-xl mx-auto">
		<CardHeader className="px-0 md:px-6">
			<CardTitle className="text-primary text-lg flex items-center">
				<CirclePlus className="size-5 mr-2" />
				Create new room</CardTitle>
			<CardDescription className="ml-1">Please insert room infos</CardDescription>
		</CardHeader>
		<CardContent className="px-0 md:px-6">
			<Form {...roomForm}>
				<form onSubmit={roomForm.handleSubmit(onSubmit)}>
					<div className="grid gap-y-3">
						<div className="grid md:grid-cols-2 md:grid-rows-3  md:gap-x-5">
							<label htmlFor="dropzone-file" className="col-span-1 row-span-3 md:h-[270px] relative">
								{previewImage.length == 0 && <div className="col-span-1 row-span-3 aspect-square border border-dashed  rounded-xl   cursor-pointer bg-gray-50 hover:bg-slate-50 grid place-items-center">
                                    <Input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={selectImage} ref={fileInputRef} />
                                    <Upload className="size-6 text-muted-foreground" />
                                </div>}
								{previewImage && <img src={previewImage} alt="preview" className="object-cover w-full h-full rounded-lg" />}
								{previewImage && <button type="button" className="absolute top-3 left-3 text-white" onClick={handleReselectImage}>
                                    <Input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={selectImage} ref={fileInputRef} />
                                    <RefreshCw className="size-4" />
                                </button>}
							</label>

							<div className="flex flex-col justify-between h-full row-span-3">
								<FormField
									control={roomForm.control}
									name="Name"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input  type="text" {...field} className={cn("rounded-lg")}/>
											</FormControl>
											<FormMessage className="text-xs font-medium" />
										</FormItem>
									)}
								/>

								<FormField
									control={roomForm.control}
									name="Capacity"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>Capacity</FormLabel>
											<FormControl>
												<Input  type="number" min={1} {...field} className={cn("rounded-lg")}/>
											</FormControl>
											<FormMessage className="text-xs font-medium" />
										</FormItem>
									)}
								/>
								<FormField
									control={roomForm.control}
									name="Equipments"
									render={({ field }) => (
										<FormItem className="flex flex-col  ">
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
																{equipments?.map((equipment) => {
																	const equipmentString = JSON.stringify(equipment);
																	const isSelected = Array.from(selectedEquipments).some(selectedEquipment => JSON.stringify(selectedEquipment) === equipmentString);

																	return  (
																		<ToggleGroupItem variant="outline" className={cn("font-normal m-1", isSelected && "bg-muted")} key={equipment.Id} value={JSON.stringify(equipment)}>
																			{equipment.Name}
																		</ToggleGroupItem>
																	)
																})}
															</ScrollArea>
														</ToggleGroup>
													</FormControl>
												</DropdownMenuContent>
											</DropdownMenu>
										</FormItem>
									)}
								/>
							</div>
						</div>
						<FormField
							control={roomForm.control}
							name="Description"
							render={({ field }) => (
								<FormItem className="col-span-1 mt-3">
									<FormLabel>Description <span className="ml-1 font-normal text-sm text-muted-foreground">(Optional)</span></FormLabel>
									<FormControl>
										<Textarea
											className=" rounded-lg focus-visible:ring-1 focus-visible:ring-offset-0 "
											placeholder="Ajouter un motif ou une observation de consultation"
											// className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs font-normal" />
								</FormItem>
							)}
						/>


					</div>
					<div className="grid md:justify-end mt-5">
						<Button type="submit" className="hover:bg-secondary rounded-lg">Create Room</Button>
					</div>
				</form>
			</Form>
		</CardContent>
	</Card>
}