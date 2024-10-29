import { BsBook, BsPeople } from "react-icons/bs";
import {
  IoNewspaperOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import AcademicDepartment from "../pages/dashboard/admin/academicManagement/academicDepartment";
import AcademicFaculty from "../pages/dashboard/admin/academicManagement/academicFaculty";
import AcademicSemester from "../pages/dashboard/admin/academicManagement/academicSemester";
import CreateAcademicDepartment from "../pages/dashboard/admin/academicManagement/create-academic-department";
import CreateAcademicFaculty from "../pages/dashboard/admin/academicManagement/create-academic-faculty";
import CreateAcademicSemester from "../pages/dashboard/admin/academicManagement/create-academic-semester";
import AdminDashboardOverview from "../pages/dashboard/admin/admin-overview";
import CreateCourse from "../pages/dashboard/admin/courseManagement/create-course";
import CreateOfferedCourse from "../pages/dashboard/admin/courseManagement/create-offered-course";
import CreateSemesterRegistration from "../pages/dashboard/admin/courseManagement/create-semester-registration";
import OfferCourses from "../pages/dashboard/admin/courseManagement/offerCourse";
import OfferedCourses from "../pages/dashboard/admin/courseManagement/offeredCourses";
import SemesterRegistration from "../pages/dashboard/admin/courseManagement/SemesterRegistration";
import AddBlogsPage from "../pages/dashboard/Blogs/add-blog";
import BlogListPage from "../pages/dashboard/Blogs/blog-list";
import NotificationPage from "../pages/dashboard/settings/Notification";
import SettingsPage from "../pages/dashboard/settings/Settings";
import { ISidebarItem } from "../types/routes.types";

export const ADMIN_SIDEBAR_ROUTES: ISidebarItem[] = [
  {
    title: "Main",
    routes: [
      {
        name: "Dashboard",
        icon: RxDashboard,
        path: "overview",
        element: <AdminDashboardOverview />,
      },
      {
        name: "Academic management",
        icon: BsPeople,
        children: [
          {
            name: "Create academic faculty",
            path: "create-academic-faculty",
            element: <CreateAcademicFaculty />,
          },
          {
            name: "Academic faculty",
            path: "academic-faculty",
            element: <AcademicFaculty />,
          },
          {
            name: "Create academic department",
            path: "create-academic-department",
            element: <CreateAcademicDepartment />,
          },
          {
            name: "Academic department",
            path: "academic-department",
            element: <AcademicDepartment />,
          },
          {
            name: "Create academic semester",
            path: "create-academic-semester",
            element: <CreateAcademicSemester />,
          },
          {
            name: "Academic semester",
            path: "academic-semester",
            element: <AcademicSemester />,
          },
        ],
      },
      {
        name: "Courses management",
        icon: BsBook,
        children: [
          {
            name: "Create course",
            path: "create-course",
            element: <CreateCourse />,
          },
          {
            name: "All courses",
            path: "all-courses",
            element: <OfferCourses />,
          },
          {
            name: "Create semester registration",
            path: "create-semester-registration",
            element: <CreateSemesterRegistration />,
          },
          {
            name: "Semester registration",
            path: "semester-registration",
            element: <SemesterRegistration />,
          },
          {
            name: "Create offered course",
            path: "create-offered-course",
            element: <CreateOfferedCourse />,
          },
          {
            name: "Offered course",
            path: "offered-course",
            element: <OfferedCourses />,
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
