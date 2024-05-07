import {INotification} from "@/types/types.ts";

export const notifications: INotification[] = [
	{
		Id: "1",
		Title: "New Message",
		Body: "You have received a new message from John Doe.",
		IsRead: false,
		CreatedAt: new Date("2024-05-07T08:30:00")
	},
	{
		Id: "2",
		Title: "Reminder",
		Body: "Don't forget about the meeting today at 10:00 AM.",
		IsRead: false,
		CreatedAt: new Date("2024-05-06T15:45:00")
	},
	{
		Id: "3",
		Title: "Payment Confirmation",
		Body: "Your payment of $50.00 for Invoice #12345 has been received.",
		IsRead: true,
		CreatedAt: new Date("2024-05-05T10:15:00")
	}
];