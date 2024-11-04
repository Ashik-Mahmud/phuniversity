import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import AppLayout from "../components/layouts/AppLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import SignInPage from "../pages/auth/sign-in";
import SignUpPage from "../pages/auth/sign-up";
import { TReactRouterItem } from "../types/routes.types";
import { getDashboardPaths } from "../utils/helper";
import { ADMIN_SIDEBAR_ROUTES } from "./admin.routes";
import { FACULTY_SIDEBAR_ROUTES } from "./faculty.routes";
import ProtectedRoutes from "./ProtectedRoutes";
import { STUDENT_SIDEBAR_ROUTES } from "./student.routes";
import { SUPER_ADMIN_SIDEBAR_ROUTES } from "./super-admin.routes";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/super-admin",
    element: (
      <ProtectedRoutes role="superAdmin">
        <DashboardLayout />
      </ProtectedRoutes>
    ),

    children: getDashboardPaths(
      SUPER_ADMIN_SIDEBAR_ROUTES
    ) as TReactRouterItem[],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <DashboardLayout />
      </ProtectedRoutes>
    ),

    children: getDashboardPaths(ADMIN_SIDEBAR_ROUTES) as TReactRouterItem[],
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoutes role="faculty">
        <DashboardLayout />
      </ProtectedRoutes>
    ),

    children: getDashboardPaths(FACULTY_SIDEBAR_ROUTES) as TReactRouterItem[],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoutes role="student">
        <DashboardLayout />
      </ProtectedRoutes>
    ),

    children: getDashboardPaths(STUDENT_SIDEBAR_ROUTES) as TReactRouterItem[],
  },

  {
    path: "*",
    element: <div>No route found</div>,
  },
]);

export default router;
