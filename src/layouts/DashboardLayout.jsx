import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;