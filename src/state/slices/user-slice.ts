import {createSlice, PayloadAction} from "@reduxjs/toolkit";



interface IUserState {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	isApproved: boolean;
	isActivated: boolean;
	token: string;
	roles: string[];
}

export const initialState : IUserState = {
	id: "",
	firstName: "",
	lastName: "",
	email: "",
	isApproved: false,
	isActivated: false,
	token: "",
	roles: []
}

const userSlice = createSlice({
	name: "userState",
	initialState,
	reducers: {
		setUser: (_state, action: PayloadAction<IUserState>) => {
			return action.payload;
		},
		setFirstName: (state, action: PayloadAction<string>) => {
			state.firstName = action.payload;
		},

		setLastName: (state, action: PayloadAction<string>) => {
			state.lastName = action.payload;
		},

		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setIsApproved: (state, action: PayloadAction<boolean>) => {
			state.isApproved = action.payload;
		},

		setIsActivated: (state, action: PayloadAction<boolean>) => {
			state.isActivated = action.payload;
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},

		setRoles: (state, action:PayloadAction<string[]>) => {
			state.roles = action.payload;
		},

	},

});

export const isAuthenticated = (state: { userState: IUserState }) => state.userState.token !== "";
export const isAdmin = (state: { userState: IUserState }) => state.userState.roles.includes("ADMIN");


export default userSlice.reducer;
export const
	{setUser,
		setFirstName,
		setLastName,
		setIsActivated,
		setEmail,
		setIsApproved,
		setRoles,
		setToken
	} = userSlice.actions;