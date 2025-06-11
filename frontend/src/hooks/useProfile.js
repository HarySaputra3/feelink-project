import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useProfileContext } from "../contexts/ProfileContext";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "./useAuth";
import API from "../utils/api";

const useProfile = () => {
  const { name, setName, email, setEmail, refreshProfile } = useProfileContext();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const updateProfileInfo = async (newName, newEmail) => {
    if (!newName.trim() || !newEmail.trim()) {
      return showToast("Nama dan Email wajib diisi", "error");
    }
    try {
      const payload = { name: newName, email: newEmail };
      const res = await API.put("/profile", payload);
      showToast(res.data.message || "Profil berhasil diperbarui!", "success");
      setName(newName);
      setEmail(newEmail);
      await refreshProfile();
    } catch (err) {
      showToast(err.response?.data?.message || "Gagal memperbarui profil", "error");
    }
  };

  const changePassword = async () => {
    if (!newPassword) {
      return showToast("Password baru wajib diisi", "error");
    }
    if (newPassword.length < 6) {
      return showToast("Password terlalu pendek", "error");
    }
    if (newPassword !== confirmPassword) {
      return showToast("Password tidak cocok", "error");
    }
    try {
      const payload = { newPassword, confirmPassword };
      const res = await API.put("/change-password", payload);
      showToast(res.data.message || "Password berhasil diubah!", "success");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      showToast(err.response?.data?.message || "Gagal mengubah password", "error");
    }
  };

  const handleUpdateProfile = async (newName, newEmail) => {
    setProfileLoading(true);
    await updateProfileInfo(newName, newEmail);
    setProfileLoading(false);
  };

  const handleChangePassword = async () => {
    setPasswordLoading(true);
    await changePassword();
    setPasswordLoading(false);
  };

  const handleLogout = () => {
    queryClient.clear();
    logout();
  };

  return {
    name, setName,
    email, setEmail,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    profileLoading,
    passwordLoading,
    handleUpdateProfile,
    handleChangePassword,
    handleLogout,
  };
};

export default useProfile;
