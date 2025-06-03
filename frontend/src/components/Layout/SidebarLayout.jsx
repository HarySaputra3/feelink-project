import { useState, useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  AlignJustify
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div className="flex min-h-screen relative" layout>
      
      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={toggleSidebar}
            layout
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            id="sidebar"
            key="sidebar"
            className={
              isMobile
                ? `fixed top-0 left-0 h-full w-64`
                : "absolute"
            }
            initial={{ x: -300, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 1 }}
            transition={{ type: "ease", duration: 0.15 }}
            layout
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {sidebarOpen && !isMobile && (
          <motion.div
            id="sidebar-placeholder"
            key="sidebar-placeholder"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }} // 256px = w-64
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "ease", duration: 0.15 }}
            className="shrink-0"
          />
        )}
      </AnimatePresence>

      {/* Toggle buttons */}
      <motion.div 
        id="toggle-sidebar-mobile"
        key="toggle-sidebar-mobile"
      >
        <button
          className="cursor-pointer fixed top-2 right-2 md:hidden "
          onClick={toggleSidebar}
        >
          <AlignJustify />
        </button>
      </motion.div>
      <motion.div 
        id="toggle-sidebar-dekstop"
        key="toggle-sidebar-dekstop"
      >
        <button
          className="cursor-pointer fixed top-2 ml-2 hidden md:block "
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ArrowLeftToLine /> : <ArrowRightFromLine />}
        </button>
      </motion.div>

      <main className="flex-1 mx-6 my-12 outline">
        <Outlet />
      </main>
    </motion.div>
  );
}