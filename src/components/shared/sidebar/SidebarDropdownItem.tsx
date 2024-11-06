import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { TChildrenRouteItem, TRoutes } from "../../../types/routes.types";
import cn from "../../../utils/cn";

type Props = {
  isCollapse: boolean;
  route: TRoutes;
};

const SidebarDropdownItem = ({ isCollapse, route }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div>
      <div
        className={cn(
          "flex w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group flex-col  ",
          isCollapse && "justify-center ",
          isDropdownOpen && "bg-gray-50"
        )}
        onClick={() => isCollapse && setIsDropdownOpen(!isDropdownOpen)}
      >
        <div
          className={cn(
            "flex items-center gap-[8px  w-full",
            isCollapse ? " justify-between" : "justify-center",
            ""
          )}
        >
          <div className="flex items-center gap-[8px]">
            <route.icon className="text-[1.3rem] text-gray-500" />
            <p
              className={`${
                isCollapse ? "inline" : "hidden"
              } text-[1rem] font-[400] text-gray-500 truncate `}
            >
              {route?.name}
            </p>
          </div>

          <IoIosArrowDown
            className={cn(
              "transition-all duration-300 text-[1rem] text-gray-500",
              isDropdownOpen ? "rotate-[180deg]" : "rotate-0",
              isCollapse ? "inline" : "hidden"
            )}
          />
        </div>

        {!isCollapse && (
          <>
            {/* hover projects dropdown */}
            <ul className="translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto  group-hover:opacity-100 group-hover:z-[500] absolute top-0 left-[55px] bg-white shadow min-w-32 transition-all duration-300 p-[8px] rounded-md  flex-col gap-[3px] text-[1rem] text-gray-500 ">
              {route?.children?.map(
                (childRoute: TChildrenRouteItem, index: number) => (
                  <li key={childRoute.name + index}>
                    <NavLink
                      className="hover:bg-gray-50 px-[20px] py-[5px] rounded-md w-full  flex items-center gap-1 truncate"
                      to={childRoute?.path}
                    >
                      {childRoute.icon ? (
                        <childRoute.icon className="text-[1.3rem] text-gray-500" />
                      ) : null}
                      {childRoute.name}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>

      {/* active projects dropdown */}
      <ul
        className={cn(
          isDropdownOpen
            ? "h-auto my-3 opacity-100 z-[1]"
            : "opacity-0 z-[-1] h-0 overflow-hidden",

          "transition-all duration-300 list-none ml-[20px] pl-[10px] border-l border-gray-300  flex-col gap-[3px] text-[1rem] text-gray-500",
          isCollapse ? "flex" : "hidden"
        )}
      >
        {route?.children?.map(
          (childRoute: TChildrenRouteItem, index: number) => (
            <li key={childRoute.name + index}>
              <NavLink
                className="hover:bg-gray-50 px-[20px] py-[5px] rounded-md w-full  flex items-center gap-1"
                to={childRoute?.path}
              >
                {childRoute.icon ? (
                  <childRoute.icon className="text-[1.3rem] text-gray-500" />
                ) : null}

                {childRoute.name}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SidebarDropdownItem;
