import {format} from "date-fns";


export const roomSchedule = [
	{
		startTime: format(new Date("2022-01-01T08:00:00"), "hh:mm a"),
		endTime: format(new Date("2022-01-01T10:00:00"), "hh:mm a"),
	},
	{
		startTime: format(new Date("2022-01-01T10:00:00"), "hh:mm a"),
		endTime: format(new Date("2022-01-01T12:00:00"), "hh:mm a"),
	},
	{
		startTime: format(new Date("2022-01-01T12:00:00"), "hh:mm a"),
		endTime: format(new Date("2022-01-01T14:00:00"), "hh:mm a"),
	},
	{
		startTime: format(new Date("2022-01-01T14:00:00"), "hh:mm a"),
		endTime: format(new Date("2022-01-01T16:00:00"), "hh:mm a"),
	},
	{
		startTime: format(new Date("2022-01-01T16:00:00"), "hh:mm a"),
		endTime: format(new Date("2022-01-01T18:00:00"), "hh:mm a"),
	}
];
