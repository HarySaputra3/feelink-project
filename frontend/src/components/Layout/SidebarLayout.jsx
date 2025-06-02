import { useState, useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  AlignJustify
} from "lucide-react";

export default function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Update sidebar state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  return (
    <div className="flex min-h-screen relative">

      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={
          isMobile
            ? `fixed top-0 left-0 z-50 ${sidebarOpen ? "" : "hidden"}`
            : "absolute"
        }
      >
        {sidebarOpen && <Sidebar />}
      </div>
      {sidebarOpen && !isMobile && (
        <div className="min-w-64" />
      )}

      {/* Toggle buttons */}
      <div id="toggle-sidebar-mobile">
        <button
          className="cursor-pointer fixed top-2 right-2 md:hidden z-50"
          onClick={toggleSidebar}
        >
          <AlignJustify />
        </button>
      </div>
      <div id="toggle-sidebar-dekstop">
        <button
          className="cursor-pointer fixed top-2 ml-2 hidden md:block z-50"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ArrowLeftToLine /> : <ArrowRightFromLine />}
        </button>
      </div>

      <main className="flex-1 mx-6 my-12 outline">
        <Outlet />
      </main>
    </div>
  );
}