import { BsPeople } from "react-icons/bs";
import {
  IoNewspaperOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import AddBlogsPage from "../pages/dashboard/Blogs/add-blog";
import BlogListPage from "../pages/dashboard/Blogs/blog-list";
import NotificationPage from "../pages/dashboard/settings/Notification";
import SettingsPage from "../pages/dashboard/settings/Settings";
import CreateAdminUsers from "../pages/dashboard/super-admin/create-admin";
import CreateFacultyUser from "../pages/dashboard/super-admin/create-faculty";
import CreateStudentsUser from "../pages/dashboard/super-admin/create-students";
import SuperAdminOverview from "../pages/dashboard/super-admin/super-admin-overview";
import { ISidebarItem } from "../types/routes.types";

export const SUPER_ADMIN_SIDEBAR_ROUTES: ISidebarItem[] = [
  {
    title: "Main",
    routes: [
      {
        name: "Dashboard",
        icon: RxDashboard,
        path: "overview",
        element: <SuperAdminOverview />,
      },
      {
        name: "User management",
        icon: BsPeople,
        children: [
          {
            name: "Create Admin",
            path: "create-admin",
            element: <CreateAdminUsers />,
          },
          {
            name: "Create faculty",
            path: "create-faculty",
            element: <CreateFacultyUser />,
          },
          {
            name: "Create students",
            path: "create-student",
            element: <CreateStudentsUser />,
          },
        ],
      },
    ],
  },

  {
    title: "Articles",
    routes: [
      {
        name: "Posts",
        icon: IoNewspaperOutline,
        children: [
          { name: "Add Post", path: "blog/add", element: <AddBlogsPage /> },
          { name: "All posts", path: "blogs", element: <BlogListPage /> },
        ],
      },
    ],
  },
  {
    title: "Settings",
    routes: [
      {
        name: "Settings",
        icon: IoSettingsOutline,
        path: "settings",
        element: <SettingsPage />,
      },
      {
        name: "Notification",
        icon: IoNotificationsOutline,
        path: "notification",
        element: <NotificationPage />,
      },
    ],
  },
];
