import {IRoom, IRoomUpdateRequest} from "@/types/types.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useRef, useState} from "react";
import {Ban, CircleCheckBig, Save, SquarePen, Upload} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useRoom} from "@/hooks/use-room.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {EditRoomSchema, editRoomSchema} from "@/zod/edit-room-schema.ts";
import EquipmentsManager from "@/components/custom/equipments-manager.tsx";
import {toast} from "@/components/ui/use-toast.ts";


interface Props {
	room: IRoom;
}

export default function EditRoomForm({room}: Props) {


	const editRoomForm = useForm<EditRoomSchema>({
		resolver: zodResolver(editRoomSchema),
		defaultValues: {
			Name: room?.Name,
			Capacity: room?.Capacity,
			Description: room?.Description,
		}
	})

	const {updateRoom} = useRoom(room?.Id);


	const onSubmit = (data: EditRoomSchema) => {
		const {Name, Capacity, Description, ImageFile} = data;

		const updatedRoom: IRoomUpdateRequest = {
			Id: room?.Id,
			Name,
			Capacity,
			Description,
			ImageFile
		}

		console.log('Updated room:', updatedRoom);


		updateRoom(updatedRoom)
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
			.catch((error) => {
				toast({
					description: (
						<div className="font-sans whitespace-pre-wrap text-wrap text-slate-100 flex items-center gap-x-1.5">
							<Ban className="size-4" />
							{error.response.data.toString()}</div>
					),
					variant: "destructive",
					className: "dark:bg-red-600"
				})
			})


	}






	const [currentImageFile, setCurrentImageFile] = useState<File>(new File([], ''))
	const [previewImage, setPreviewImage] = useState<string>(room?.ImagePath || '');
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		editRoomForm.setValue('ImageFile', currentImageFile)
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


	return <Tabs defaultValue="room" className="w-full">
		<TabsList className="bg-slate-200 dark:bg-gray-800">
			<TabsTrigger value="room" >Room</TabsTrigger>
			<TabsTrigger value="equipments">Equipments</TabsTrigger>
		</TabsList>
		<TabsContent value="room">
			<Card className="px-5 md:w-[70%] lg:w-[50%] rounded-xl mx-auto">
				<CardHeader className="px-0 md:px-6">
					<CardTitle className="text-primary text-lg flex items-center">
						<SquarePen className="size-4 mr-2" />
						Edit room
					</CardTitle>
				</CardHeader>
				<CardContent className="px-0 md:px-6">
					<Form {...editRoomForm}>
						<form onSubmit={editRoomForm.handleSubmit(onSubmit)}>
							<div className="grid gap-y-3">
								<div className="grid gap-y-8">
									<label htmlFor="dropzone-file" className="col-span-1 row-span-3 md:h-[270px] relative">
										{previewImage?.length == 0 && <div className="col-span-1 row-span-3  border border-dashed  rounded-xl h-full cursor-pointer bg-gray-50 hover:bg-slate-50 grid place-items-center">
                                            <Input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={selectImage} ref={fileInputRef} />
                                            <Upload className="size-6 text-muted-foreground" />
                                        </div>}
										{previewImage && <img src={previewImage} alt="preview" className="object-cover w-full h-full rounded-lg" />}
										{previewImage && <button type="button" className="absolute top-3 left-3 text-white" onClick={handleReselectImage}>
                                            <Input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={selectImage} ref={fileInputRef} />
											<Button type="button" size="icon" variant="outline" className="text-foreground hover:bg-muted"><Upload className="size-4" /></Button>
                                        </button>}
									</label>

									<div className="flex items-center flex-col md:flex-row gap-5 w-full ">
										<FormField
											control={editRoomForm.control}
											name="Name"
											render={({ field }) => (
												<FormItem className="flex-1 w-full">
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input  type="text" {...field} className={cn("rounded-lg focus-visible:ring-primary")}/>
													</FormControl>
													<FormMessage className="text-xs font-medium" />
												</FormItem>
											)}
										/>

										<FormField
											control={editRoomForm.control}
											name="Capacity"
											render={({ field }) => (
												<FormItem className="flex-1 w-full">
													<FormLabel>Capacity</FormLabel>
													<FormControl>
														<Input  type="number" min={1} {...field}  className={cn("rounded-lg focus-visible:ring-primary")}/>
													</FormControl>
													<FormMessage className="text-xs font-medium" />
												</FormItem>
											)}
										/>

									</div>
								</div>
								<FormField
									control={editRoomForm.control}
									name="Description"
									render={({ field }) => (
										<FormItem className="col-span-1 mt-3">
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													className=" rounded-lg focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-primary"
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
								<Button disabled={!editRoomForm.formState.isDirty} size="sm" type="submit" className="hover:bg-secondary rounded-full">
									<Save className="size-4 mr-1.5" />
									Update
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</TabsContent>
		<TabsContent value="equipments">
			<EquipmentsManager roomId={room?.Id} roomEquipments={room?.RoomEquipments} />
		</TabsContent>
	</Tabs>

}