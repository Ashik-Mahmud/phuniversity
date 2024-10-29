import React from "react";
import { IconType } from "react-icons";


export type TChildrenRouteItem = {
    name: string;
    icon?: IconType;
    path: string;
    element?: React.ReactNode;
}
// Define the types for the route structure
export interface ISidebarRoute {
    name: string;
    icon: IconType; // Assuming the icon is a React component
    path: string; // path is optional for child routes
    element?: React.ReactNode;
    children?: TChildrenRouteItem[];
}


export interface ISidebarRouteWithChildren {
    name: string;
    icon: IconType;
    children: TChildrenRouteItem[];
    element?: React.ReactNode;
    path?: undefined;
}

export type TRoutes = (ISidebarRoute | ISidebarRouteWithChildren)


export type TReactRouterItem = {
    path: string;
    element: React.ReactNode;
    index?: boolean
}

export interface ISidebarItem {
    title: string;
    routes: TRoutes[];
}

