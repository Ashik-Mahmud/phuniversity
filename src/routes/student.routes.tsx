import { BiUser } from "react-icons/bi";
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
import CreateEnrolledCourse from "../pages/dashboard/student/create-enrolled-courses";
import MyOfferedCourses from "../pages/dashboard/student/my-offered-courses";
import MyStudentSchedule from "../pages/dashboard/student/my-schedule";
import StudentOverview from "../pages/dashboard/student/student-overview";
import TranscriptPage from "../pages/dashboard/student/transcript";
import { ISidebarItem } from "../types/routes.types";

export const STUDENT_SIDEBAR_ROUTES: ISidebarItem[] = [
  {
    title: "Main",
    routes: [
      {
        name: "Dashboard",
        icon: RxDashboard,
        path: "overview",
        element: <StudentOverview />,
      },
      {
        name: "Student",
        icon: BiUser,
        children: [
          {
            name: "My Offered Courses",
            path: "my-offered-courses",
            element: <MyOfferedCourses />,
          },
          {
            name: "Create enrolled Courses",
            path: "create-enrolled-courses",
            element: <CreateEnrolledCourse />,
          },
          {
            name: "My Schedules",
            path: "my-schedules",
            element: <MyStudentSchedule />,
          },
          {
            name: "My Transcript",
            path: "transcript",
            element: <TranscriptPage />,
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
