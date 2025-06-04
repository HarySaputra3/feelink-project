import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import Logo from "../../assets/feelink.svg";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) return showToast("Please enter your email.", "error");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return showToast("Invalid email address.", "error");
    if (!password) return showToast("Please enter your password.", "error");

    await login(email, password);
  };

  return (
    <main className="bg-neutral-50 min-h-screen flex md:items-center justify-center">
      <div className="relative flex flex-row xl:w-[1140px]">

        {/* Left Panel */}
        <div className="flex flex-col items-center md:justify-center gap-4 bg-secondary md:rounded-xl w-screen h-screen md:w-[600px] md:h-[500px] px-6 py-6 md:pt-12 md:pb-24 md:px-24 shadow-lg z-10">
          <Link to="/">
            <img src={Logo} alt="Feelink Logo" className="w-24 h-24 my-4" />
          </Link>
          <div className="text-2xl md:text-4xl font-bold text-primary text-center">
            Login to your account
          </div>
          <div className="xl:hidden text-center">
            <span>
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent-darker hover:underline">
                Sign Up here
              </Link>
            </span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-4 w-full"
          >
            <input
              className="border border-primary rounded px-3 py-2 bg-neutral-50 text-primary placeholder-neutral-500 outline-none focus:ring focus:ring-primary w-full"
              autoFocus
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border border-primary rounded px-3 py-2 bg-neutral-50 text-primary placeholder-neutral-500 outline-none focus:ring focus:ring-primary w-full"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className={`rounded px-3 py-2 w-full text-secondary ${
                loading ? "bg-primary-lighter cursor-not-allowed" : "bg-primary cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? <Loading /> : "Login"}
            </button>
          </form>
          <Link to="#" className="text-red-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Right Panel */}
        <div className="hidden xl:flex flex-col items-center justify-center gap-4 text-secondary bg-primary rounded-xl w-[600px] h-[500px] px-6 py-6 shadow-xl absolute -right-10 top-1/2 -translate-y-1/2 z-20">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Don't have an account?
          </h1>
          <div className="text-center">
            <p>Start your journey now</p>
            <button
              type="submit"
              onClick={() => navigate("/signup")}
              className="rounded px-3 py-2 text-primary bg-secondary cursor-pointer w-full mt-4"
            >
              Sign Up here
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
