import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import API from "../../utils/api";
import { useToast } from "../../context/ToastContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      showToast(res.data.message || "Login successful!", "success");
      setTimeout(() => navigate("/dashboard"), 800); // short delay for toast
    } catch (err) {
      console.error("[LOGIN ERROR]", err);
      showToast(err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <Link to="/" className='px-3 py-2 bg-gray-100 hover:bg-gray-200'>{'<'}</Link>
      <div className="text-xl font-bold">Login Page</div>
      <input
        className="border px-3 py-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border px-3 py-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Login
      </button>
      <Link to="/signup" className="px-3 py-2 bg-gray-100 hover:bg-gray-200">Signup</Link>
    </main>
  );
}

export default LoginPage