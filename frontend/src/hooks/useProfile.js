import { useState, useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import { useLoading } from "../contexts/LoadingContext";
import API from "../utils/api";

const useProfile = () => {
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = res.data;
        setName(data.name || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error("[FETCH PROFILE ERROR]", err.response?.data);
        showToast("Failed to load profile", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [setIsLoading, showToast]);

  const updateProfileInfo = async () => {
    if (!name.trim() || !email.trim()) {
      return showToast("Name and Email are required", "error");
    }
    setIsLoading(true);
    try {
      const payload = { name, email };
      const res = await API.put("/profile", payload);
      showToast(res.data.message || "Profile updated!", "success");
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
  };
};

export default useProfile;
