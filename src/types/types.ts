export interface Role {
	Id?: string;
	Name: string;
}

export interface IUser {
	Id?: string;
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
	Roles?: Role[];
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