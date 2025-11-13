import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterDash from "../components/FooterDash";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <Navbar></Navbar>

      
      <main className="pt-16 pb-10">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>

      
      <FooterDash></FooterDash>
    </div>
  );
}
