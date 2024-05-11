import {useMutation, useQuery, useQueryClient} from "react-query";
import UserApi from "@/API/user-api.ts";
import {useNavigate} from "react-router-dom";
import {IUserUpdateRequest} from "@/types/types.ts";
import {useDispatch} from "react-redux";
import {setEmail, setFirstName, setLastName} from "@/state/slices/user-slice.ts";




export const useUser = (userId: string) => {

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();


	const {mutateAsync: updateMutation} = useMutation({
		mutationFn: async (user: IUserUpdateRequest) => await UserApi.updateUser(userId, user),
		onSuccess: async () => {
			// Refetch the user data after the user is updated
			await queryClient.invalidateQueries(["user", userId]);
			navigate("/user/profile")

		},

		onError: (error) => {
			console.log('Error updating user', error)
		}
	})


	const {data: fetchedUserData} = useQuery({
		queryKey: ["user", userId],
		queryFn: async () => await UserApi.fetchUser(userId),
		onSuccess: (response) => {
			dispatch(setFirstName(response.data.firstName))
			dispatch(setLastName(response.data.lastName))
			dispatch(setEmail(response.data.email))
		},
		enabled: !!userId,
	})

	const updateUser = async (user: IUserUpdateRequest) => await updateMutation(user);




	return {updateUser, fetchedUserData}



}