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
      console.error("[LOGIN ERROR]", err.response?.data);
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
      console.error("[REGISTER ERROR]", err.response?.data);
      showToast(err.response?.data?.message || "Register failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    showToast("Logged out successfully", "success");
    setTimeout(() => navigate("/login"), 500);
  }

  return { login, register, logout, loading };
};

export default useAuth;
