import { IUser } from "@/redux/features/auth/auth.types";
import getDecodeToken from "@/utils/getDecodeToken";
import React from "react";
import { Navigate } from "react-router-dom";
import { onLogout } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/store";

type Props = {
  children: React.ReactNode;
  role: "superAdmin" | "admin" | "faculty" | "student";
};

const ProtectedRoutes = ({ children, role }: Props) => {
  const token = useAppSelector(useCurrentToken);

  const dispatch = useAppDispatch();
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }
  const user = getDecodeToken(token!) as IUser;

  if (user?.role !== role) {
    dispatch(onLogout());
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoutes;
