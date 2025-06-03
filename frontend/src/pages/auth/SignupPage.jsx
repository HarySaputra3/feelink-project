import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/feelink.svg";
import { useToast } from "../../contexts/ToastContext";
import useAuth from "../../hooks/useAuth";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showToast } = useToast();
  const { register } = useAuth();

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
        <div className="text-2xl md:text-4xl font-bold">Create your account</div>
        <div className="text-center text-pretty">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-accent-darker hover:underline">Login here</Link>
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
            className="border rounded px-3 py-2 bg-neutral-50 placeholder-secondary-darker w-full"
            autoFocus
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 bg-neutral-50 placeholder-secondary-darker w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 bg-neutral-50 placeholder-secondary-darker w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 bg-neutral-50 placeholder-secondary-darker w-full"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="rounded px-3 py-2 text-secondary bg-primary cursor-pointer w-full"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
