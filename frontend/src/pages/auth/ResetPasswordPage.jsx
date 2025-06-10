import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/feelink.svg";
import { useToast } from "../../contexts/ToastContext";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: email input, 2: OTP + password reset
  const { showToast } = useToast();
  const { forgotPassword, resetPassword, loading } = useAuth();

  const handleEmailSubmit = async () => {
    if (!email.trim()) return showToast("Please enter your email.", "error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return showToast("Enter a valid email.", "error");

    const result = await forgotPassword(email);
    if (result.success) {
      setStep(2);
    }
  };

  const handlePasswordReset = async () => {
    if (!otpCode) return showToast("Enter the OTP code.", "error");
    if (otpCode.length !== 6) return showToast("OTP code must be 6 digits.", "error");
    if (!password) return showToast("Enter your new password.", "error");
    if (password.length < 6) return showToast("Password must be at least 6 characters.", "error");
    if (password !== confirmPassword) return showToast("Passwords do not match.", "error");

    await resetPassword(email, otpCode, password);
  };

  const handleSubmit = () => {
    if (step === 1) {
      handleEmailSubmit();
    } else {
      handlePasswordReset();
    }
  };

  return (
    <main className="text-primary bg-neutral-50 h-screen grid place-content-center">
      <div className="flex flex-col items-center md:justify-center gap-4 bg-secondary md:rounded-xl w-screen h-screen md:h-full px-6 py-6 md:max-w-[700px] md:pt-12 md:pb-24 md:px-24 shadow-lg">
        <Link to="/">
          <img src={Logo} alt="Feelink Logo" className="w-24 h-24 my-4" />
        </Link>
        <div className="text-2xl md:text-4xl font-bold">
          {step === 1 ? "Reset your password" : "Enter OTP & New Password"}
        </div>
        <div className={`text-center text-pretty ${step === 2 ? 'hidden' : ''}`}>
          <p>
            Remember your password?{" "}
            <Link to="/login" className="text-accent-darker hover:underline">Login here</Link>
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-4 w-full"
        >
          {step === 1 ? (
            // Step 1: Email input
            <input
              className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
              autoFocus
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            // Step 2: OTP + Password reset
            <>
              <div className="text-sm text-neutral-600 mb-2">
                OTP code sent to: <span className="font-medium">{email}</span>
              </div>
              <input
                className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                type="text"
                placeholder="Enter 6-digit OTP code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                autoFocus
              />
              <div className="relative">
                <input
                  className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
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
                  placeholder="Confirm New Password"
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
            </>
          )}
          
          <button
            type="submit"
            className={`rounded px-3 py-2 w-full text-secondary ${
              loading ? "bg-primary-lighter cursor-not-allowed" : "bg-primary cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loading />
            ) : step === 1 ? (
              "Send OTP Code"
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
        
        {step === 2 && (
          <button
            type="button"
            className="text-accent-darker hover:underline text-sm cursor-pointer"
            onClick={() => setStep(1)}
          >
            ← Back to email entry
          </button>
        )}
      </div>
    </main>
  );
};

export default ResetPasswordPage;