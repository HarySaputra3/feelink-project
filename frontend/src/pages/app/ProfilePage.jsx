import useProfile from "../../hooks/useProfile";
import { useToast } from "../../contexts/ToastContext";

const ProfilePage = () => {
  const {
    name, setName,
    email, setEmail,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    updateProfileInfo,
    changePassword,
  } = useProfile();

  const { showToast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("token");
    showToast("Logged out successfully", "success");
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfileInfo();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword) return showToast("Enter your new password.", "error");
    if (newPassword.length < 6) return showToast("Password too short.", "error");
    if (newPassword !== confirmPassword) return showToast("Passwords do not match.", "error");
    changePassword();
  };

  return (
    <>
      <header className="text-primary p-6 md:p-12 border-b-2">
        <h1 className="text-4xl">Profile Settings</h1>
      </header>
      <div className="grid grid-rows-1 lg:grid-cols-2 max-w-7xl text-primary">
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 p-6 md:p-12 w-full">
          <label>
            Name
            <input
              className="border rounded px-3 py-2 mt-2 bg-neutral-50 w-full"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              className="border rounded px-3 py-2 mt-2 bg-neutral-50 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="px-3 py-2 mt-2 bg-primary text-secondary rounded cursor-pointer"
          >
            Update Profile
          </button>
        </form>
        <div className="p-6 md:p-12">
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4 w-full">
            <label>
              New Password
              <input
                className="border rounded px-3 py-2 mt-2 bg-neutral-50 w-full"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              Confirm Password
              <input
                className="border rounded px-3 py-2 mt-2 bg-neutral-50 w-full"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="px-3 py-2 mt-2 bg-primary text-secondary rounded cursor-pointer"
            >
              Change Password
            </button>
          </form>
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-red-600 hover:bg-red-100 rounded cursor-pointer mt-6"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
