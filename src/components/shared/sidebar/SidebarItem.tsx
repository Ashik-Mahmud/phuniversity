import { ISidebarItem } from "../../../types/routes.types";
import cn from "../../../utils/cn";
import SidebarItemLink from "./SidebarItemLink";
type Props = {
  isCollapse: boolean;
  item: ISidebarItem;
};

const SidebarItem = ({ isCollapse, item }: Props) => {
  return (
    <div className={cn("transition-all duration-300 ease-in-out mt-6")}>
      <p
        className={cn(
          "text-[0.9rem] text-gray-500 truncate",
          isCollapse ? "text-start" : "text-center"
        )}
      >
        {item.title}
      </p>

      <div className="mt-3 flex flex-col gap-[5px]">
        {item.routes.map((route, index) => (
          <SidebarItemLink
            isCollapse={isCollapse}
            route={route}
            key={route.name + index}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarItem;
