import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import API from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import Logo from '../../assets/feelink.svg'

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
      console.error("[LOGIN ERROR]", err.response?.data);
      showToast(err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <main className="text-primary bg-neutral-50 h-screen grid place-content-center">
      <div className="flex flex-row">
        <div className="flex flex-col items-center md:justify-center gap-4 bg-secondary rounded-lg w-screen h-screen md:max-w-[600px] md:max-h-[500px] px-6 py-6 md:pt-12 md:pb-24 md:px-24 shadow-lg">
          <Link to="/">
            <img
              src={Logo}
              alt="Feelink Logo"
              className="w-24 h-24 my-4"
            />
          </Link>
          <div className="text-2xl md:text-4xl font-bold">Login to your account</div>
          <div className="xl:hidden text-center">
            <span>
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent hover:underline">
                Sign Up here
              </Link>
            </span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <input
              className="border rounded-lg px-3 py-2 bg-neutral-50 placeholder-secondary-darker w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border rounded-lg px-3 py-2 bg-neutral-50 placeholder-secondary-darker w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="rounded-lg px-3 py-2 text-secondary bg-primary cursor-pointer w-full"
            >
              Login
            </button>
          </div>
          <Link to="#" className="text-red-500 hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="hidden xl:flex flex-col items-center md:justify-center gap-4 text-secondary bg-primary rounded-lg w-screen h-screen md:max-w-[600px] md:max-h-[500px] px-6 py-6 shadow-lg">
          <h1 className="text-2xl md:text-4xl font-bold">Don't have an account?</h1>
          <div className="text-center text-pretty">
            <p>Start your journey now</p>
            <button
              onClick={() => navigate("/signup")}
              className="rounded-lg px-3 py-2 text-primary bg-secondary cursor-pointer w-full mt-4"
            >
              Sign Up here
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage