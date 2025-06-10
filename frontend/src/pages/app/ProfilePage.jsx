import { useState, useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import { useToast } from "../../contexts/ToastContext";
import Loading from "../../components/Loading";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

const ProfilePage = () => {
  const {
    name, email,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    updateProfileInfo,
    changePassword,
  } = useProfile();

  const { showToast } = useToast();
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  // Local state for form fields
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Local loading states
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Sync local state when context changes
  useEffect(() => {
    setLocalName(name);
    setLocalEmail(email);
  }, [name, email]);

  const handleLogout = () => {
    queryClient.clear();
    logout();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    await updateProfileInfo(localName, localEmail);
    setProfileLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return showToast("Enter your new password.", "error");
    if (newPassword.length < 6) return showToast("Password too short.", "error");
    if (newPassword !== confirmPassword) return showToast("Passwords do not match.", "error");
    setPasswordLoading(true);
    await changePassword();
    setPasswordLoading(false);
  };

  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2 flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-4xl font-semibold">Profile Settings</h1>
      </header>
      <main className="grid grid-rows-1 lg:grid-cols-2 max-w-7xl text-primary overflow-x-auto mx-auto">

        {/* Profile Form */}
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 py-6 sm:p-6 md:p-12 w-full border-b-1 lg:border-b-0 lg:border-r-1">
          <label>
            <h2 className="text-lg font-semibold mb-2">Name</h2>
            <input
              className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
              type="text"
              placeholder="Name"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              disabled={profileLoading}
            />
          </label>
          <label>
            <h2 className="text-lg font-semibold mb-2">Email</h2>
            <input
              className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
              type="email"
              placeholder="Email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              disabled={profileLoading}
            />
          </label>
          <button
            type="submit"
            className={`px-3 py-2 mt-2 bg-primary text-secondary rounded ${profileLoading ? "cursor-not-allowed bg-primary-lighter" : "cursor-pointer"}`}
            disabled={profileLoading}
          >
            {profileLoading ? <Loading /> : "Update profile"}
          </button>
        </form>
        <div className="py-6 sm:p-6 md:p-12">

          {/* Change Password Form */}
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4 w-full">
            <label>
              <h2 className="text-lg font-semibold mb-2">New Password</h2>
              <div className="relative">
                <input
                  className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={passwordLoading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer 
                    ${newPassword ? "" : "hidden"}`}
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </label>
            <label>
              <h2 className="text-lg font-semibold mb-2">Confirm Password</h2>
              <div className="relative">
                <input
                  className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={passwordLoading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer 
                    ${confirmPassword ? "" : "hidden"}`}
                  aria-label="Toggle password visibility"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </label>
            <button
              type="submit"
              className={`px-3 py-2 mt-2 bg-primary text-secondary rounded ${passwordLoading ? "cursor-not-allowed bg-primary-lighter" : "cursor-pointer"}`}
              disabled={passwordLoading}
            >
              {passwordLoading ? <Loading /> : "Change password"}
            </button>
          </form>
        </div>

        <button
          onClick={handleLogout}
          className="p-3 text-red-100 bg-red-600 hover:text-red-600 hover:bg-red-100 active:bg-red-100 rounded-tl cursor-pointer w-fit absolute bottom-0 right-0"
        >
          <LogOut />
        </button>
      </main>
    </>
  );
};

export default ProfilePage;
