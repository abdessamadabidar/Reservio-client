
export interface IUser {
	Id: string;
	FirstName: string;
	LastName: string;
	Email: string;
	Password?: string;
	IsApproved?: boolean;
	IsActivated?:boolean;
	CreatedAt?: Date;
	UpdatedAt?: Date;
	VerifiedAt?: Date | null;
	Token?: string;
	Roles?: string[];
}

export type User = {
	Id: string;
	FirstName: string;
	LastName: string;
}

type Room = {
	Id: string;
	Name: string;
	Capacity: number;
	ImageUrl: string;
}

export interface IReservation {
	Id: string;
	StartDateTime: Date;
	EndDateTime: Date;
	Description: string;
	User: User;
	Room: Room;
	CreatedAt: Date;
}

export interface INotification {
	Id: string;
	Title: string;
	Body: string;
	IsRead: boolean;
	CreatedAt: string;
}

export interface IEquipment {
	Id?: string;
	Name: string;
}


export interface IUserUpdateRequest {
	id: string;
	firstName?: string;
	lastName?: string;
	email?: string;
}

export interface IChangePasswordRequest {
	oldPassword: string;
	newPassword: string;
}

export interface IRoomRequest {
	Name: string;
	Capacity: number;
	Description?: string;
	Equipments: IEquipment[];
	ImageFile: File | null;
}


export interface IRoom {
	Id: string;
	Name: string;
	Description: string;
	Capacity: number;
	ImagePath: string;
	RoomEquipments: IEquipment[];
	CreatedAt: Date;
}


export interface IRoomAvailability {
	RoomId: string;
	StartTime: string;
	EndTime: string;
}