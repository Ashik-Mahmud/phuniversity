import { useEffect, useState } from "react";

// react icons

import { MAIN_LOGO } from "@/config/additional.config";
import useGetScreenSize from "@/hooks/useGetScreenSize";
import useGetUserByToken from "@/hooks/useGetUserByToken";
import { IoIosCode } from "react-icons/io";
import { USER_ROLE } from "../../../constant/role";
import { ADMIN_SIDEBAR_ROUTES } from "../../../routes/admin.routes";
import { FACULTY_SIDEBAR_ROUTES } from "../../../routes/faculty.routes";
import { STUDENT_SIDEBAR_ROUTES } from "../../../routes/student.routes";
import { SUPER_ADMIN_SIDEBAR_ROUTES } from "../../../routes/super-admin.routes";
import cn from "../../../utils/cn";
import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";
import { SIDEBAR_ROUTES } from "./sidebar.config";

const ResponsiveSidebar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [routes, setRoutes] = useState(SIDEBAR_ROUTES);

  const { width: screenWidth } = useGetScreenSize();
  const userByToken = useGetUserByToken();

  useEffect(() => {
    if (userByToken) {
      switch (userByToken?.role) {
        case USER_ROLE.superAdmin:
          setRoutes(SUPER_ADMIN_SIDEBAR_ROUTES);
          break;
        case USER_ROLE.admin:
          setRoutes(ADMIN_SIDEBAR_ROUTES);
          break;
        case USER_ROLE.faculty:
          setRoutes(FACULTY_SIDEBAR_ROUTES);
          break;
        case USER_ROLE.student:
          setRoutes(STUDENT_SIDEBAR_ROUTES);
          break;

        default:
          break;
      }
    }
  }, [userByToken]);

  useEffect(() => {
    if (screenWidth <= 768) {
      setIsCollapse(false);
    }
  }, [screenWidth]);

  return (
    <aside
      className={`bg-white shadow  z-30 sm:overflow-visible rounded-md transition-all  duration-300 ease sticky  box-border  top-0   flex flex-col justify-between ${
        isCollapse ? "w-72" : "w-20"
      }`}
    >
      <div className="flex-1  px-4">
        {/* Logo */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out mt-5",
            isCollapse ? "px-[20px]" : "px-[10px]"
          )}
        >
          <img src={MAIN_LOGO} alt="" width={50} />
        </div>

        {/* collapse button */}
        <div
          className="bg-white shadow-lg hidden md:block p-[5px] rounded-md w-max absolute top-[50px] right-[-20px] cursor-pointer"
          onClick={() => setIsCollapse(!isCollapse)}
        >
          <IoIosCode className="text-[1.5rem] text-gray-500" />
        </div>

        {/* general section */}
        <div
          className={cn(
            " md:h-[80dvh]  nice-scroll",
            isCollapse ? "overflow-y-auto" : ""
          )}
        >
          {routes?.map((item, index: number) => (
            <SidebarItem
              isCollapse={isCollapse}
              item={item}
              key={item?.title + "_" + index}
            />
          ))}
        </div>
      </div>

      {/* Profile */}
      <div className=" flex-1  flex items-end justify-end">
        <SidebarProfile isCollapse={isCollapse} />
      </div>
    </aside>
  );
};

export default ResponsiveSidebar;
