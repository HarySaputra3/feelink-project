import { Navigate } from "react-router-dom";

// look for token in localStorage
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
