import { useToast } from "../../contexts/ToastContext";

const ProfilePage = () => {
  const { showToast } = useToast();

  const handleLogout = () => {
    showToast("Logged out successfully", "success");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="px-2 py-1 text-red-600 hover:bg-red-100 rounded text-left cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;