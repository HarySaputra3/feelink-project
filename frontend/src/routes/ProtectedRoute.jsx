import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export default function ProtectedRoute({ children, redirectIfAuth = false }) {
  const token = localStorage.getItem("token");
  const expired = token ? isTokenExpired(token) : true;

  if (redirectIfAuth && token && !expired) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!redirectIfAuth && (!token || expired)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}
