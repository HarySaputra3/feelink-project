import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import { useToast } from "../../context/ToastContext";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();

  const handleSignup = async () => {
    try {
      const res = await API.post("/register", { email, password });
      showToast(res.data.message || "Registered successfully!", "success");
    } catch (err) {
      console.error("[REGISTER ERROR]", err);
      showToast(err.response?.data?.message || "Register failed", "error");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Link to="/" className="px-3 py-2 bg-gray-100 hover:bg-gray-200">{'<'}</Link>
      <div className="text-xl font-bold">Signup Page</div>
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
        onClick={handleSignup}
        className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Register
      </button>
      <Link to="/login" className="px-3 py-2 bg-gray-100 hover:bg-gray-200">Login</Link>
    </main>
  );
};

export default SignupPage;
