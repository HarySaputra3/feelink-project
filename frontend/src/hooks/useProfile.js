import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useLoading } from "../contexts/LoadingContext";
import { useProfileContext } from "../contexts/ProfileContext";
import API from "../utils/api";

const useProfile = () => {
  const { name, setName, email, setEmail, refreshProfile } = useProfileContext();
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateProfileInfo = async (newName, newEmail) => {
    if (!newName.trim() || !newEmail.trim()) {
      return showToast("Name and Email are required", "error");
    }
    setIsLoading(true);
    try {
      const payload = { name: newName, email: newEmail };
      const res = await API.put("/profile", payload);
      showToast(res.data.message || "Profile updated!", "success");
      setName(newName);
      setEmail(newEmail);
      await refreshProfile();
    } catch (err) {
      showToast(err.response?.data?.message || "Update failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async () => {
    if (!newPassword) {
      return showToast("New password is required", "error");
    }
    if (newPassword !== confirmPassword) {
      return showToast("Passwords do not match", "error");
    }
    setIsLoading(true);
    try {
      const payload = { newPassword, confirmPassword };
      const res = await API.put("/change-password", payload);
      showToast(res.data.message || "Password changed!", "success");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      showToast(err.response?.data?.message || "Password change failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name, setName,
    email, setEmail,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    updateProfileInfo,
    changePassword,
    refreshProfile,
  };
};

export default useProfile;