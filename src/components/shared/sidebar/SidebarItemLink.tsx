import { NavLink } from "react-router-dom";
import { TRoutes } from "../../../types/routes.types";
import cn from "../../../utils/cn";
import SidebarDropdownItem from "./SidebarDropdownItem";

type Props = {
  isCollapse: boolean;
  route: TRoutes;
};

const SidebarItemLink = ({ isCollapse, route }: Props) => {
  if (route?.children!?.length > 0) {
    return <SidebarDropdownItem isCollapse={isCollapse} route={route} />;
  }
  return (
    <NavLink
      to={route?.path || ""}
      className={cn(
        "flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group",
        isCollapse ? "justify-between" : "justify-center"
      )}
    >
      <div className="flex items-center gap-[8px]">
        {route.icon ? (
          <route.icon className="text-[1.3rem] text-gray-500" />
        ) : null}
        <p
          className={cn(
            "text-[1rem] font-[400] text-gray-500 truncate",
            isCollapse ? "inline" : "hidden"
          )}
        >
          {route.name}
        </p>
      </div>

      {/* tooltip */}
      <div
        className={cn(
          "absolute top-0 right-[-108px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500",
          isCollapse ? "hidden" : "inline"
        )}
      >
        <p className="text-[0.9rem] w-max bg-gray-600 text-white rounded px-3 py-[5px]">
          {route.name}
        </p>
      </div>
    </NavLink>
  );
};

export default SidebarItemLink;
