import { Outlet } from "react-router-dom";
import ResponsiveSidebar from "../shared/sidebar/Sidebar";

type Props = {};

const DashboardLayout = (_props: Props) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ResponsiveSidebar />

      <div className="dashboard-content  flex-1 flex flex-col w-full p-4 sm:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
