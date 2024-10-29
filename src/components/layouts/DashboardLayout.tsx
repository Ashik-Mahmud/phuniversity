import { Outlet } from "react-router-dom";
import ResponsiveSidebar from "../shared/sidebar/Sidebar";

type Props = {};

const DashboardLayout = (_props: Props) => {
  return (
    <div className="grid grid-cols-12 ">
      <ResponsiveSidebar />

      <div className="dashboard-content col-span-10  h-dvh">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
