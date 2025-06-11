import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/feelink.svg";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);

  const { submitEmailForReset, submitNewPassword, loading } = useAuth();

  const handleSubmit = async () => {
    if (step === 1) {
      const result = await submitEmailForReset(email);
      if (result.success) setStep(2);
    } else {
      await submitNewPassword(email, otpCode, password, confirmPassword);
    }
  };

  return (
    <main className="text-primary bg-neutral-50 h-screen grid place-content-center">
      <div className="flex flex-col items-center md:justify-center gap-4 bg-secondary md:rounded-xl w-screen h-screen md:h-full px-6 py-6 md:max-w-fit md:pt-12 md:pb-24 md:px-24 shadow-lg">
        <Link to="/">
          <img src={Logo} alt="Feelink Logo" className="w-24 h-24 my-4" />
        </Link>
        <div className="text-2xl md:text-4xl font-bold">
          {step === 1 ? "Reset Password Kamu" : "Masukkan OTP & Password Baru"}
        </div>
        <div className={`text-center ${step === 2 ? 'hidden' : ''}`}>
          <p>
            Ingin kembali ke halaman login?{" "}
            <Link to="/login" className="text-accent-darker hover:underline">Login lewat sini</Link>
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
            <input
              className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
              autoFocus
              type="email"
              placeholder="Masukkan email kamu..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <>
              <div className="text-sm text-neutral-600 mb-2">
                OTP sudah dikirim ke: <span className="font-medium">{email}</span>
              </div>
              <input
                className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                type="text"
                placeholder="Masukkan 6-digit kode OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                autoFocus
              />
              <div className="relative">
                <input
                  className="border rounded px-3 py-2 w-full bg-neutral-50 placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password Baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer ${password ? "" : "hidden"}`}
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <input
                  className="border rounded px-3 py-2 w-full bg-neutral-50 placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Konfirmasi Password Baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer ${confirmPassword ? "" : "hidden"}`}
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`rounded px-3 py-2 w-full text-secondary ${loading ? "bg-primary-lighter cursor-not-allowed" : "bg-primary cursor-pointer"}`}
          >
            {loading ? <Loading /> : step === 1 ? "Kirim Kode OTP" : "Reset Password"}
          </button>
        </form>

        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-accent-darker hover:underline text-sm cursor-pointer"
          >
            ← Salah memasukkan email?
          </button>
        )}
      </div>
    </main>
  );
};

export default ResetPasswordPage;
