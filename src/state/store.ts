import {configureStore} from "@reduxjs/toolkit";
import setUserReducer from "@/state/slices/user-slice.ts";


export const store = configureStore({
	reducer: {
		userState: setUserReducer,
	}

});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;