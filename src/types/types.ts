
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

export interface INotification {
	Id?: string;
	Title: string;
	Body: string;
	IsRead: boolean;
	CreatedAt: Date;
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