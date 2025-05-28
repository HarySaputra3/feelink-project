import { Navigate } from "react-router-dom";

// look for token in localStorage
export default function ProtectedRoute({ children, redirectIfAuth = false }) {
  const token = localStorage.getItem("token");

  if (redirectIfAuth && token) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!redirectIfAuth && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
