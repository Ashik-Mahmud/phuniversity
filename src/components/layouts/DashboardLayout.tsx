import { Outlet } from "react-router-dom";
import ResponsiveSidebar from "../shared/sidebar/Sidebar";

type Props = {};

const DashboardLayout = (_props: Props) => {
  return (
    <div className="flex max-h-screen bg-gray-50 overflow-auto">
      <ResponsiveSidebar />

      <div className="dashboard-content  flex-1 flex flex-col w-full p-4 sm:p-10 z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
