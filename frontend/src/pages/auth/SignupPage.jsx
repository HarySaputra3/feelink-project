import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/feelink.svg";
import { useToast } from "../../contexts/ToastContext";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { Eye, EyeOff } from "lucide-react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const { showToast } = useToast();
  const { register, loading } = useAuth();

  const handleSignup = async () => {
    if (!name.trim()) return showToast("Please enter your name.", "error");
    if (!email.trim()) return showToast("Please enter your email.", "error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return showToast("Enter a valid email.", "error");
    if (!password) return showToast("Enter your password.", "error");
    if (password.length < 6) return showToast("Password too short.", "error");
    if (password !== confirmPassword) return showToast("Passwords do not match.", "error");

    await register(name, email, password);
  };

  return (
    <main className="text-primary bg-neutral-50 h-screen grid place-content-center">
      <div className="flex flex-col items-center md:justify-center gap-4 bg-secondary md:rounded-xl w-screen h-screen md:h-full px-6 py-6 md:max-w-[600px] md:pt-12 md:pb-24 md:px-24 shadow-lg">
        <Link to="/">
          <img src={Logo} alt="Feelink Logo" className="w-24 h-24 my-4" />
        </Link>
        <div className="text-2xl md:text-4xl font-bold">Buat Akun Kamu</div>
        <div className="text-center text-pretty">
          <p>
            Sudah punya akun?{" "}
            <Link to="/login" className="text-accent-darker hover:underline">Kembali ke halaman Login</Link>
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="flex flex-col gap-4 w-full"
        >
          <input
            className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
            autoFocus
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <button
                type="button"
                tabIndex={-1}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer 
                  ${password ? "" : "hidden"}`}
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
          </div>
          <div className="relative">
            <input
              className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
              <button
                type="button"
                tabIndex={-1}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer 
                  ${confirmPassword ? "" : "hidden"}`}
                aria-label="Toggle password visibility"
                onClick={() => setConfirmShowPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
          </div>
          <button
            type="submit"
            className={`rounded px-3 py-2 w-full text-secondary ${
              loading ? "bg-primary-lighter cursor-not-allowed" : "bg-primary cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? <Loading /> : "Daftar"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
