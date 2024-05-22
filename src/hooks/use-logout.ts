import {useDispatch, useSelector} from "react-redux";
import {initialState, isAuthenticated, setUser} from "@/state/slices/user-slice.ts";
import {useNavigate} from "react-router-dom";


export const useLogout = () => {

	const isUserAuthenticated  = useSelector(isAuthenticated);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		if(isUserAuthenticated) {
			dispatch(setUser(initialState));
			navigate("/auth/login");
		}
	}


	return {logout}
}