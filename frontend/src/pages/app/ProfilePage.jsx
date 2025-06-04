import { useState, useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import { useToast } from "../../contexts/ToastContext";
import Loading from "../../components/Loading";

const ProfilePage = () => {
  const {
    name, email,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    updateProfileInfo,
    changePassword,
  } = useProfile();

  const { showToast } = useToast();

  // Local state for form fields
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);

  // Local loading states
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Sync local state when context changes
  useEffect(() => {
    setLocalName(name);
    setLocalEmail(email);
  }, [name, email]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showToast("Logged out successfully", "success");
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
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2">
        <h1 className="text-4xl">Profile Settings</h1>
      </header>
      <main className="grid grid-rows-1 lg:grid-cols-2 max-w-7xl text-primary overflow-x-auto">
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 py-6 sm:p-6 md:p-12 w-full border-b-1 lg:border-b-0 lg:border-r-1">
          <label>
            <h2 className="text-lg font-medium">Name</h2>
            <input
              className="border rounded px-3 py-2 mt-2 bg-neutral-50 w-full placeholder-neutral-500"
              type="text"
              placeholder="Name"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              disabled={profileLoading}
            />
          </label>
          <label>
            <h2 className="text-lg font-medium">Email</h2>
            <input
              className="border rounded px-3 py-2 mt-2 bg-neutral-50 w-full placeholder-neutral-500"
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
            {profileLoading ? <Loading /> : "Update Profile"}
          </button>
        </form>
        <div className="py-6 sm:p-6 md:p-12">
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4 w-full">
            <label>
              <h2 className="text-lg font-medium">New Password</h2>
              <input
                className="border rounded px-3 py-2 mt-2 bg-neutral-50 w-full placeholder-neutral-500"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={passwordLoading}
              />
            </label>
            <label>
              <h2 className="text-lg font-medium">Confirm Password</h2>
              <input
                className="border rounded px-3 py-2 mt-2 bg-neutral-50 w-full placeholder-neutral-500"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={passwordLoading}
              />
            </label>
            <button
              type="submit"
              className={`px-3 py-2 mt-2 bg-primary text-secondary rounded ${passwordLoading ? "cursor-not-allowed bg-primary-lighter" : "cursor-pointer"}`}
              disabled={passwordLoading}
            >
              {passwordLoading ? <Loading /> : "Change Password"}
            </button>
          </form>
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-red-600 hover:bg-red-100 rounded cursor-pointer mt-6"
          >
            Logout
          </button>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
