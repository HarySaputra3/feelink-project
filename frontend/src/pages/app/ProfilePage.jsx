import { useState, useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import Loading from "../../components/Loading";
import { Eye, EyeOff, LogOut } from "lucide-react";

const ProfilePage = () => {
  const {
    name, email,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    profileLoading,
    passwordLoading,
    handleUpdateProfile,
    handleChangePassword,
    handleLogout,
  } = useProfile();

  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setLocalName(name);
    setLocalEmail(email);
  }, [name, email]);

  const onSubmitProfile = (e) => {
    e.preventDefault();
    handleUpdateProfile(localName, localEmail);
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();
    handleChangePassword();
  };

  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2 flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-4xl font-semibold">Pengaturan Profil</h1>
        <button
          onClick={handleLogout}
          className="p-3 text-red-100 bg-red-600 hover:text-red-600 hover:bg-red-100 active:bg-red-100 rounded cursor-pointer w-fit"
        >
          Keluar
        </button>
      </header>

      <main className="grid grid-rows-1 lg:grid-cols-2 max-w-7xl text-primary overflow-x-auto mx-auto">

        {/* Profile Update Form */}
        <form onSubmit={onSubmitProfile} className="flex flex-col gap-4 py-6 sm:p-6 md:p-12 w-full border-b-1 lg:border-b-0 lg:border-r-1">
          <label>
            <h2 className="text-lg font-semibold mb-2">Nama</h2>
            <input
              className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
              type="text"
              placeholder="Masukan nama mu disini..."
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
              placeholder="Masukan email mu disini..."
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

        {/* Change Password Form */}
        <div className="py-6 sm:p-6 md:p-12">
          <form onSubmit={onSubmitPassword} className="flex flex-col gap-4 w-full">
            <label>
              <h2 className="text-lg font-semibold mb-2">Password Baru</h2>
              <div className="relative">
                <input
                  className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan password baru mu disini..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={passwordLoading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer ${newPassword ? "" : "hidden"}`}
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            <label>
              <h2 className="text-lg font-semibold mb-2">Konfirmasi Password</h2>
              <div className="relative">
                <input
                  className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Konfirmasi password baru mu..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={passwordLoading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer ${confirmPassword ? "" : "hidden"}`}
                  aria-label="Toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className={`px-3 py-2 mt-2 bg-primary text-secondary rounded ${passwordLoading ? "cursor-not-allowed bg-primary-lighter" : "cursor-pointer"}`}
              disabled={passwordLoading}
            >
              {passwordLoading ? <Loading /> : "Ubah Password"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
