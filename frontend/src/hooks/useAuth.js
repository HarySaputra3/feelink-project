import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import API from "../utils/api";

const useAuth = () => {
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await API.post("/login", { email, password });
      const authHeader = res.headers["authorization"] || res.headers["Authorization"];
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
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
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await API.post("/register", { name, email, password });
      showToast(res.data.message || "Registered successfully!", "success");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error("[REGISTER ERROR]", err.response?.data);
      showToast(err.response?.data?.message || "Register failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register };
};

export default useAuth;
