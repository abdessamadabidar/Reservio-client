import AuthApi from "@/API/auth-api.ts";
import {LoginSchema} from "@/zod/login-schema.ts";
import {useDispatch, useSelector,} from "react-redux";
import {useMutation, useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";
import {setUser} from "@/state/slices/user-slice.ts";
import {RootState} from "@/state/store.ts";



export const useAuthentication = () => {

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {id, token} = useSelector((state: RootState) => state.userState);

	const {mutateAsync: loginMutation, isLoading} = useMutation({
		mutationFn: async (credentials : LoginSchema) => await AuthApi.signIn(credentials),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries({ queryKey: ["user"] });
			const loggedUser = response.data;
			dispatch(setUser(loggedUser));
			navigate("/")

		},
		onError: (error) => {
			console.log('react query on error', error);
		}
	})
	const login = async (credentials: LoginSchema)  => {
		if (id !== "" && token !== "") {
			// user is already logged in
			navigate("/")
			return;
		}

		return await loginMutation(credentials)
	}

	return {login, isLoading};
}