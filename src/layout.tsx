import Sidebar from "@/features/sidebar/sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="pl-14">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
