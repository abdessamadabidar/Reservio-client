import {useDispatch, useSelector} from "react-redux";
import {initialState, isAuthenticated, setUser} from "@/state/slices/user-slice.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {useNavigate} from "react-router-dom";


export const useLogout = () => {

	const isUserAuthenticated  = useSelector(isAuthenticated);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		if(isUserAuthenticated) {
			dispatch(setUser(initialState));
			toast({
				title: "Sign up",
				description: "You have been logged out successfully",
				className: "bg-green-600 border-0 text-slate-100"
			})
			navigate("/auth");
		}
	}


	return {logout}
}