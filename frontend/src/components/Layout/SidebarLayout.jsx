import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  AlignJustify,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const isFirstRender = useRef(true);

  // Update sidebar state on window resize
  useEffect(() => {
    isFirstRender.current = false;
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
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-black/70 to-black/40 backdrop-blur-sm z-40"
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
                ? `fixed top-0 left-0 h-full w-64 z-40`
                : "fixed z-40"
            }
            initial={isFirstRender.current ? false : { x: -300, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 1 }}
            transition={{ type: "ease", duration: 0.15 }}
            layout={false}
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Placeholder for sidebar width when closed (desktop only) */}
      <AnimatePresence>
        {sidebarOpen && !isMobile && (
          <motion.div
            id="sidebar-placeholder"
            key="sidebar-placeholder"
            initial={isFirstRender.current ? false : { width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }} // 256px = w-64
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "ease", duration: 0.15 }}
            className="shrink-0"
            layout={false}
          />
        )}
      </AnimatePresence>

      {/* Toggle buttons */}
      <motion.div 
        id="toggle-sidebar-mobile"
        key="toggle-sidebar-mobile"
      >
        {/* Mobile toggle button */}
        <button
          className="cursor-pointer fixed top-2 right-2 md:hidden text-primary z-50"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <X /> : <AlignJustify />}
        </button>
      </motion.div>
      <motion.div 
        id="toggle-sidebar-dekstop"
        key="toggle-sidebar-dekstop"
      >
        {/* Desktop toggle button */}
        <button
          className="cursor-pointer fixed top-2 ml-2 hidden md:block text-primary"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ArrowLeftToLine /> : <ArrowRightFromLine />}
        </button>
      </motion.div>

      <div className="flex-1 px-6 py-12 bg-secondary-lighter overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}