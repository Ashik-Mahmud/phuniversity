import { USER_ROLE } from "../constant/role";
import { TUserRole } from "../redux/features/auth/auth.types";
import { ISidebarItem } from "../types/routes.types";

export const getDashboardPaths = (routes: ISidebarItem[]) => {
  const modifiedRoutes = routes?.map((parentRoutes) => {
    let flatArray: { path: string; element: React.ReactNode }[] = [];
    parentRoutes.routes.forEach((route) => {
      if (!route.children?.length) {
        flatArray.push({
          path: route.path as string,
          element: route.element,
        });
      } else {
        route.children?.forEach((child) => {
          flatArray.push({ path: child.path, element: child.element });
        });
      }
    });
    return flatArray;
  });

  return modifiedRoutes.flat(Infinity);
};

export const getModifiedRole = (role: TUserRole) => {
  switch (role) {
    case USER_ROLE.admin:
      return role;
      break;
    case USER_ROLE.student:
      return role;
      break;
    case USER_ROLE.faculty:
      return role;
      break;
    case USER_ROLE.superAdmin:
      return "super-admin";
      break;
    default:
      break;
  }
};
