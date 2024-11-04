import { useEffect, useState } from "react";

// react icons
import { BsThreeDotsVertical } from "react-icons/bs";

import useGetUserByToken from "@/hooks/useGetUserByToken";
import { IoIosCode } from "react-icons/io";
import { USER_ROLE } from "../../../constant/role";
import { ADMIN_SIDEBAR_ROUTES } from "../../../routes/admin.routes";
import { FACULTY_SIDEBAR_ROUTES } from "../../../routes/faculty.routes";
import { STUDENT_SIDEBAR_ROUTES } from "../../../routes/student.routes";
import { SUPER_ADMIN_SIDEBAR_ROUTES } from "../../../routes/super-admin.routes";
import cn from "../../../utils/cn";
import TextLogo from "../../ui/TextLogo";
import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";
import { SIDEBAR_ROUTES } from "./sidebar.config";

const ResponsiveSidebar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [routes, setRoutes] = useState(SIDEBAR_ROUTES);

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
    if (window.scrollX < 600) {
      setIsCollapse(false);
    }
  }, []);

  return (
    <aside
      className={`bg-white shadow col-span-2 overflow-hidden sm:overflow-visible rounded-md transition-all  duration-300 ease sticky h-[99.5dvh] box-border  top-0 ${
        !isCollapse ? " sm:col-span-1 w-full sm:w-[60%]" : " mr-10"
      }  flex flex-col justify-between`}
    >
      <div>
        {/* Logo */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out mt-5",
            isCollapse ? "px-[20px]" : "px-[10px]"
          )}
        >
          {isCollapse ? (
            <div className="flex items-center justify-between">
              <TextLogo />
              <div className="relative group">
                <BsThreeDotsVertical className="text-[1.9rem] text-gray-500 cursor-pointer p-[5px] rounded-md hover:bg-gray-50" />
              </div>
            </div>
          ) : (
            <TextLogo firstName="  " coloredName="Vat" />
          )}
        </div>

        {/* collapse button */}
        <div
          className="bg-white shadow-lg hidden sm:block p-[5px] rounded-md w-max absolute top-[50px] right-[-20px] cursor-pointer"
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
      <SidebarProfile isCollapse={isCollapse} />
    </aside>
  );
};

export default ResponsiveSidebar;
