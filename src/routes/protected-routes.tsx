import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";
import {isAuthenticated} from "@/state/slices/user-slice.ts";

type Props = { children: React.ReactNode, allowedRole: string };



const ProtectedRoute = ({ children, allowedRole }: Props) => {
	const location = useLocation();
	const {roles} = useSelector((state: RootState) => state.userState);
	const isUserAuthenticated  = useSelector(isAuthenticated)

	const isAuthorized = isUserAuthenticated &&  roles?.includes(allowedRole);
	return isAuthorized ? (
		<>{children}</>
	) : (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;