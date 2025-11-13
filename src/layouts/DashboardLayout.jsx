import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterDash from "../components/FooterDash";

export default function DashboardLayout() {
  return (
    <div className=" bg-gray-50">
      
      <Navbar></Navbar>

      
      <main className=" ">
        <div className="">
          <Outlet />
        </div>
      </main>

      
      <FooterDash></FooterDash>
    </div>
  );
}
