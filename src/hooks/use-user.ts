import {useMutation, useQuery, useQueryClient} from "react-query";
import UserApi from "@/API/user-api.ts";
import {useNavigate} from "react-router-dom";
import {IChangePasswordRequest, IReservation, IUser, IUserUpdateRequest} from "@/types/types.ts";
import {useDispatch} from "react-redux";
import {setEmail, setFirstName, setIsActivated, setLastName} from "@/state/slices/user-slice.ts";
import {useLogout} from "@/hooks/use-logout.ts";




export const useUser = (userId?: string) => {

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();

	const {logout} = useLogout();



	const {data: allUsers, isLoading: usersAreLoading} = useQuery({
		queryKey: ["users"],
		queryFn: async () => await UserApi.fetchAllUsers(),
		onSuccess: (response) => {
			console.log('All users', response)
		},
		onError: (error) => {
			console.log('Error fetching all users', error)
		}
	})


	const Users: IUser[] = allUsers?.data?.map((user) => {
		return {
			Id: user?.id,
			FirstName: user?.firstName,
			LastName: user?.lastName,
			Email: user?.email,
			IsActivated: user?.isActivated,
			IsApproved: user?.isApproved,
			CreatedAt: user?.createdAt,
			UpdatedAt: user?.updatedAt,
			VerifiedAt: user?.verifiedAt,
		}

	}) as IUser[];


	const {mutateAsync: updateMutation} = useMutation({
		mutationFn: async (user: IUserUpdateRequest) => await UserApi.updateUser(userId!, user),
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
		queryFn: async () => await UserApi.fetchUser(userId!),
		onSuccess: (response) => {
			dispatch(setFirstName(response.data.firstName))
			dispatch(setLastName(response.data.lastName))
			dispatch(setEmail(response.data.email))
		},
		enabled: !!userId,
	})




	const {mutateAsync: changePasswordMutation} = useMutation({
		mutationFn: async (passwordRequest: IChangePasswordRequest) => await UserApi.changePassword(userId!, passwordRequest),
		onSuccess: async () => {
			logout();
		},
		onError: (error) => {
			console.log('Error changing password', error)
		}
	})


	const {mutateAsync: enableAccountMutation}  = useMutation({
		mutationFn: async () => await UserApi.enableAccount(userId!),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["users"]);
			dispatch(setIsActivated(true))
			// here's a bug: you need to click twice to enable the account
			// dispatch(setIsActivated(fetchUserData?.data.isActivated))
		},
		onError: (error) => {
			console.log('Error enabling account', error)
		}
	})

	const {mutateAsync: disableAccountMutation}  = useMutation({
		mutationFn: async () => await UserApi.disableAccount(userId!),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["users"]);
			dispatch(setIsActivated(false))
			// dispatch(setIsActivated(fetchUserData?.data.isActivated))
		},
		onError: (error) => {
			console.log('Error disabling account', error)
		}
	});






	const {data: userReservations, isLoading: userReservationsAreLoading} = useQuery({
		queryKey: ["userReservations", userId],
		queryFn: async () => await UserApi.fetchUserReservations(userId!),
		onSuccess: (response) => {
			console.log('User reservations', response)
		},
		onError: (error) => {
			console.log('Error fetching user reservations', error)
		}
	})


	const UserReservations : IReservation[] = userReservations?.data?.map((reservation) => {
		return {
			Id: reservation?.id,
			StartDateTime: reservation?.startDateTime,
			EndDateTime: reservation?.endDateTime,
			Description: reservation?.description,
			Room: {
				Id: reservation?.room?.id,
				Name: reservation?.room?.name,
				Capacity: reservation?.room?.capacity,
				ImageUrl: reservation?.room?.imageUrl
			},
			CreatedAt: reservation?.createdAt

		}
	}) as IReservation[];



	const {mutateAsync: deleteUserMutation} = useMutation({
		mutationFn: async (Id: string) => await UserApi.deleteUser(Id!),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["users"]);
		},
		onError: (error) => {
			console.log('Error deleting user', error)
		}

	});






	const updateUser = async (user: IUserUpdateRequest) => await updateMutation(user);
	const changePassword = async (passwordRequest: IChangePasswordRequest) => await changePasswordMutation(passwordRequest);
	const enableAccount = async () => await enableAccountMutation();
	const disableAccount = async () => await disableAccountMutation();
	const deleteUser = async (Id: string) => await deleteUserMutation(Id);

	return {updateUser, changePassword, enableAccount, disableAccount,fetchedUserData, allUsers: Users, usersAreLoading, userReservations: UserReservations, userReservationsAreLoading, deleteUser}



}