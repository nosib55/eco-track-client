import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <Navbar></Navbar>

      
      <main className="pt-16 pb-10">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>

      
      <Footer></Footer>
    </div>
  );
}
