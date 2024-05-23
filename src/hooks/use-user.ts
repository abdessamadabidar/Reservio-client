import {useMutation, useQuery, useQueryClient} from "react-query";
import UserApi from "@/API/user-api.ts";
import {useNavigate} from "react-router-dom";
import {IChangePasswordRequest, IReservation, IUser, IUserUpdateRequest} from "@/types/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {isAdmin, setEmail, setFirstName, setIsActivated, setLastName} from "@/state/slices/user-slice.ts";
import {useLogout} from "@/hooks/use-logout.ts";
import {RootState} from "@/state/store.ts";




export const useUser = (userId?: string) => {

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const {token} = useSelector((state: RootState) => state.userState);
	const {logout} = useLogout();
	const userIsAdmin = useSelector(isAdmin);


	const {data: allUsers, isLoading: usersAreLoading} = useQuery({
		queryKey: ["users"],
		queryFn: async () => await UserApi.fetchAllUsers(token),
		onSuccess: (response) => {
			console.log('All users', response)

		},
		onError: (error) => {
			console.log('Error fetching all users', error)

		},

		enabled: userIsAdmin

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



	const {data: recentUsers} = useQuery({
		queryKey: ["recentUsers"],
		queryFn: async () => await UserApi.fetchRecentUsers(token),
		onSuccess: (response) => {
			console.log('Recent users', response)

		},
		onError: (error) => {
			console.log('Error fetching recent users', error)

		},
		enabled: userIsAdmin

	})

	const RecentUsers: IUser[] = recentUsers?.data?.map((user) => {
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
		mutationFn: async (user: IUserUpdateRequest) => await UserApi.updateUser(userId!, user, token),
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
		queryFn: async () => await UserApi.fetchUser(userId!, token),
		onSuccess: (response) => {
			dispatch(setFirstName(response.data.firstName))
			dispatch(setLastName(response.data.lastName))
			dispatch(setEmail(response.data.email))
		},
		enabled: !!userId,
	})




	const {mutateAsync: changePasswordMutation} = useMutation({
		mutationFn: async (passwordRequest: IChangePasswordRequest) => await UserApi.changePassword(userId!, passwordRequest, token),
		onSuccess: async () => {
			logout();
		},
		onError: (error) => {
			console.log('Error changing password', error)
		}
	})


	const {mutateAsync: enableAccountMutation}  = useMutation({
		mutationFn: async () => await UserApi.enableAccount(userId!, token),
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
		mutationFn: async () => await UserApi.disableAccount(userId!, token),
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
		queryFn: async () => await UserApi.fetchUserReservations(userId!, token),
		onSuccess: (response) => {
			console.log('User reservations', response)
		},
		onError: (error) => {
			console.log('Error fetching user reservations', error)
		},
		enabled: !!userId,
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
		mutationFn: async (Id: string) => await UserApi.deleteUser(Id!, token),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["users"]);
		},
		onError: (error) => {
			console.log('Error deleting user', error)
		}

	});


	const {mutateAsync: approveUserMutation} = useMutation({
		mutationFn: async () => await UserApi.approveUser(userId!, token),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["users"]);
		},
		onError: (error) => {
			console.log('Error approving user', error)
		}
	});




	const usersCount = allUsers?.data?.length;
	const usersRegisteredTodayCount = allUsers?.data.filter((user: { createdAt: string; }) => new Date(user.createdAt).toDateString() === new Date().toDateString()).length;




	const updateUser = async (user: IUserUpdateRequest) => await updateMutation(user);
	const changePassword = async (passwordRequest: IChangePasswordRequest) => await changePasswordMutation(passwordRequest);
	const enableAccount = async () => await enableAccountMutation();
	const disableAccount = async () => await disableAccountMutation();
	const deleteUser = async (Id: string) => await deleteUserMutation(Id);
	const approveUser = async () => await approveUserMutation();

	return {
		updateUser,
		changePassword,
		enableAccount,
		disableAccount,
		fetchedUserData,
		allUsers: Users,
		usersAreLoading,
		userReservations: UserReservations,
		userReservationsAreLoading,
		deleteUser,
		recentUsers: RecentUsers,
		usersCount,
		usersRegisteredTodayCount,
		approveUser
	}



}