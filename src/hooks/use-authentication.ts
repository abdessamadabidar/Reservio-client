import AuthApi from "@/API/auth-api.ts";
import {LoginSchema} from "@/zod/login-schema.ts";
import {IUser} from "@/types/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";
import {useMutation, useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";
import {setUser} from "@/state/slices/user-slice.ts";



export const useAuthentication = () => {
	const user : IUser | null = useSelector((state: RootState) => state.userState.user);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {mutateAsync: loginMutation, isLoading} = useMutation({
		mutationFn: async (credentials : LoginSchema) => await AuthApi.signIn(credentials),
		onSuccess: (response) => {
			const loggedUser = response.data;
			const user : IUser = {
				Id: loggedUser.id,
				Email: loggedUser.email,
				FirstName: loggedUser.firstName,
				LastName: loggedUser.lastName,
				Roles: [...loggedUser.roles],
				IsActivated: loggedUser.isActivated,
				IsApproved: loggedUser.isApproved,
				Token: loggedUser.token
			}


			queryClient.invalidateQueries({ queryKey: ["user"] }).then(() => {
				dispatch(setUser(user))
				navigate("/")
			});

		},
		onError: (error) => {
			console.log('react query on error', error);
		}
	})
	const login = async (credentials: LoginSchema)  => {
		if (user) {
			// user is already logged in
			navigate("/")
			return;
		}

		return await loginMutation(credentials)
	}

	return {login, isLoading};
}