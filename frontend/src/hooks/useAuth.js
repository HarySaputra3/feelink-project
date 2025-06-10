import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const useAuth = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post("/login", { email, password });
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        showToast(res.data.message || "Login successful", "success");
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        showToast("No token received from server.", "error");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await API.post("/register", { name, email, password });
      showToast(res.data.message || "Registered successfully!", "success");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      showToast(err.response?.data?.message || "Register failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    showToast("Logged out successfully", "success");
    setTimeout(() => navigate("/login"), 500);
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const res = await API.post("/forgot-password", { email });
      showToast(res.data.message || "Kode OTP telah dikirim ke email", "success");
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to send reset code", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    setLoading(true);
    try {
      const res = await API.post("/reset-password", { 
        email, 
        code, 
        newPassword 
      });
      showToast(res.data.message || "Password berhasil direset", "success");
      setTimeout(() => navigate("/login"), 1000);
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to reset password", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword, confirmPassword) => {
    setLoading(true);
    try {
      const res = await API.put("/change-password", { 
        newPassword, 
        confirmPassword 
      });
      showToast(res.data.message || "Password berhasil diubah", "success");
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to change password", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { 
    login, 
    register, 
    logout, 
    forgotPassword, 
    resetPassword, 
    changePassword, 
    loading 
  };
};

export default useAuth;