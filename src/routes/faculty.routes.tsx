import { BsPeople } from "react-icons/bs";
import {
  IoNewspaperOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import AddBlogsPage from "../pages/dashboard/Blogs/add-blog";
import BlogListPage from "../pages/dashboard/Blogs/blog-list";
import FacultyOverview from "../pages/dashboard/faculty/faculty-overview";
import MyCourses from "../pages/dashboard/faculty/my-courses";
import MyFacultySchedule from "../pages/dashboard/faculty/my-schedule";
import UpdateMarks from "../pages/dashboard/faculty/update-marks";
import NotificationPage from "../pages/dashboard/settings/Notification";
import SettingsPage from "../pages/dashboard/settings/Settings";
import { ISidebarItem } from "../types/routes.types";

export const FACULTY_SIDEBAR_ROUTES: ISidebarItem[] = [
  {
    title: "Main",
    routes: [
      {
        name: "Dashboard",
        icon: RxDashboard,
        path: "overview",
        element: <FacultyOverview />,
      },
      {
        name: "Faculty",
        icon: BsPeople,
        children: [
          {
            name: "My Courses",
            path: "my-courses",
            element: <MyCourses />,
          },
          {
            name: "Update marks",
            path: "update-marks",
            element: <UpdateMarks />,
          },
          {
            name: "My Schedule",
            path: "my-schedules",
            element: <MyFacultySchedule />,
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
