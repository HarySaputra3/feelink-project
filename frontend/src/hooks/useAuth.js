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
        showToast(res.data.message || "Berhasil masuk", "success");
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        showToast("Token tidak diterima dari server.", "error");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Gagal masuk", "error");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await API.post("/register", { name, email, password });
      showToast(res.data.message || "Pendaftaran berhasil!", "success");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      showToast(err.response?.data?.message || "Pendaftaran gagal", "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    showToast("Berhasil keluar", "success");
    setTimeout(() => navigate("/login"), 500);
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const res = await API.post("/forgot-password", { email });
      showToast(res.data.message || "Kode OTP telah dikirim ke email", "success");
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || "Gagal mengirim kode OTP", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    setLoading(true);
    try {
      const res = await API.post("/reset-password", { email, code, newPassword });
      showToast(res.data.message || "Password berhasil direset", "success");
      setTimeout(() => navigate("/login"), 1000);
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || "Password gagal direset", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword, confirmPassword) => {
    setLoading(true);
    try {
      const res = await API.put("/change-password", { newPassword, confirmPassword });
      showToast(res.data.message || "Password berhasil diubah", "success");
      return { success: true };
    } catch (err) {
      showToast(err.response?.data?.message || "Password gagal diubah", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const submitEmailForReset = async (email) => {
    if (!email.trim()) {
      showToast("Silakan masukkan email Anda.", "error");
      return { success: false };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Masukkan email yang valid.", "error");
      return { success: false };
    }
    return await forgotPassword(email);
  };

  const submitNewPassword = async (email, otpCode, password, confirmPassword) => {
    if (!otpCode) return showToast("Masukkan kode OTP.", "error");
    if (otpCode.length !== 6) return showToast("Kode OTP harus 6 digit.", "error");
    if (!password) return showToast("Masukkan password baru Anda.", "error");
    if (password.length < 6) return showToast("Password harus minimal 6 karakter.", "error");
    if (password !== confirmPassword) return showToast("Konfirmasi password tidak cocok.", "error");

    return await resetPassword(email, otpCode, password);
  };

  return {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    submitEmailForReset,
    submitNewPassword,
    loading,
  };
};

export default useAuth;
