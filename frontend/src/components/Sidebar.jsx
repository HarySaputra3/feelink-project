import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    showToast("Logged out successfully", "success");
  };

  return (
    <nav className="w-64 bg-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <a href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-200">Dashboard</a>
        </li>
        <li>
          <a href="/entry" className="block px-2 py-1 rounded hover:bg-gray-200">Entry</a>
        </li>
        <li>
          <a href="/history" className="block px-2 py-1 rounded hover:bg-gray-200">History</a>
        </li>
        <li>
          <a href="/settings" className="block px-2 py-1 rounded hover:bg-gray-200">Settings</a>
        </li>
      </ul>
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="block w-full px-2 py-1 text-red-600 hover:bg-red-100 rounded text-left"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;