import { Link } from "react-router-dom";
import Logo from '../assets/feelink.svg'
import {
  User,
  LayoutDashboard,
  NotebookPen,
  History,
} from "lucide-react";

const Sidebar = () => {
  return (
    <nav className="w-64 bg-secondary text-primary font-medium border-r min-h-screen">
      <div id="logo" className="flex items-center gap-2 px-6 py-6 border-b">
        <img
          src={Logo}
          alt="Feelink Logo"
          className="w-10 h-10"
        />
        <h1 className="text-3xl">Feelink</h1>
      </div>
      <div id="menu" className="px-4 py-6">
        <ul>
          <Link to="/dashboard" className="flex flex-row items-center px-4 hover:bg-accent rounded cursor-pointer">
            <LayoutDashboard size={20}/>
            <span className="px-2 py-2">Dashboard</span>
          </Link>
          <Link to="/entry" className="flex flex-row items-center px-4 hover:bg-accent rounded cursor-pointer">
            <NotebookPen size={20}/>
            <span className="px-2 py-2">Entry</span>
          </Link>
          <Link to="/history" className="flex flex-row items-center px-4 hover:bg-accent rounded cursor-pointer">
            <History size={20}/>
            <span className="px-2 py-2">History</span>
          </Link>
        </ul>
      </div>
      <div id="user" className="px-6 py-6 border-t">
        <Link to="/profile" className="border-l-2 hover:border-transparent flex flex-row items-center cursor-pointer px-2">
          <User size={20}/>
          <div className="px-2 py-1">
            <span>your name</span>
            <p className="text-xs text-gray-500">yourname@email.com</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;