import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "@/types/types.ts";


interface IUserSlice {
	user: IUser | null;
}

const initialState : IUserSlice = {
	user: null,
}

const userSlice = createSlice({
	name: "userState",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.user = action.payload;
		},

	},

});


export default userSlice.reducer;
export const {setUser} = userSlice.actions;