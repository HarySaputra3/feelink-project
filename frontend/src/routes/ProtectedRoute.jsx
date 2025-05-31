import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../contexts/ToastContext";

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export default function ProtectedRoute({ children, redirectIfAuth = false }) {
  const { showToast } = useToast();
  const token = localStorage.getItem("token");
  const expired = token ? isTokenExpired(token) : true;
  const [showedExpiredToast, setShowedExpiredToast] = useState(false);

  useEffect(() => {
    if (!redirectIfAuth && expired && token && !showedExpiredToast) {
      showToast("Session expired. Please log in again.", "error");
      setShowedExpiredToast(true);
    }
  }, [expired, redirectIfAuth, showToast, token, showedExpiredToast]);

  if (redirectIfAuth && token && !expired) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!redirectIfAuth && (!token || (expired && showedExpiredToast))) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}