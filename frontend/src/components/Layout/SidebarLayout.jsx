import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import {
  ArrowLeftToLine,
  ArrowRightFromLine
} from "lucide-react";

export default function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && <Sidebar />}
      <div>
        <button
          className=""
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          {sidebarOpen ? <ArrowLeftToLine /> : <ArrowRightFromLine  />}
        </button>
      </div>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}