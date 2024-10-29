import React from "react";
import { Navigate } from "react-router-dom";
import { onLogout } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useCurrentToken, useCurrentUser } from "../redux/store";

type Props = {
  children: React.ReactNode;
  role: "superAdmin" | "admin" | "faculty" | "student";
};

const ProtectedRoutes = ({ children, role }: Props) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user?.role !== role) {
    dispatch(onLogout());
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoutes;
