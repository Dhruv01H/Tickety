import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle Sign In
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", obj, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data) {
        setMessage("Successful Login!");
        try {
          const sessionResponse = await axios.get("http://localhost:8080/api/auth/session", {
            withCredentials: true,
          });

          if (sessionResponse.status === 200) {
            setUser(sessionResponse.data);
            navigate("/");
          } else {
            setMessage("Session issue. Try logging in again.");
          }
        } catch (sessionError) {
          console.error("Session Fetch Error:", sessionError);
          setUser(null);
        }
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError("Something went wrong. Please try again.");
    }
  };

  // Send OTP to Email
  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/sendOtp", { email });
      if (response.status === 200) {
        setOtpSent(true);
        setMessage("OTP sent to your email.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error.message);
      setMessage("Failed to send OTP. Try again.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/verifyOtp", { email, otp });

      if (response.status === 200) {
        setOtpVerified(true);
        setMessage("OTP Verified! Enter your new password.");
      } else {
        setMessage("Incorrect OTP. Try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.response?.data || error.message);
      setMessage("Invalid OTP.");
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      console.log("Resetting password for:", email);
      const response = await axios.post("http://localhost:8080/api/auth/forget-password", {
        email,
        password: newPassword,
      });

      if (response.status === 200) {
        setMessage("Password Reset Successful! Please login.");
        
        // Reset State
        setForgotPassword(false);
        setOtpSent(false);
        setOtpVerified(false);
        setNewPassword("");
        setConfirmNewPassword("");
        setEmail("");
      }
    } catch (error) {
      console.error("Password Reset Error:", error.response?.data || error.message);
      setMessage("Failed to reset password. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center px-6 py-6 rounded-2xl bg-slate-300 min-w-[350px]">
        {!forgotPassword ? (
          // **Sign In Form**
          <form action="" onSubmit={handleForm} className="flex flex-col gap-4 mb-8">
            <h1 className="mb-4 text-3xl font-bold">Sign In</h1>

            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Email" className="text-lg">E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-start gap-2 mb-4">
              <label htmlFor="Password" className="text-lg">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={8}
                maxLength={14}
                className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400"
              />
            </div>

            <button type="submit" className="py-1.5 text-xl rounded-xl font-medium bg-slate-700 text-frost">
              Sign In
            </button>
          </form>
        ) : (
          // **Forgot Password Flow**
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Forgot Password</h1>

            {!otpSent && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-400"
                />
                <button onClick={handleSendOtp} className="py-2 text-xl bg-slate-700 rounded-lg text-frost">
                  Send OTP
                </button>
              </>
            )}

            {otpSent && !otpVerified && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-400"
                />
                <button onClick={handleVerifyOtp} className="py-2 text-xl bg-slate-700 rounded-lg text-frost">
                  Verify OTP
                </button>
              </>
            )}

            {otpVerified && (
              <>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-400"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-400"
                />
                <button onClick={handleResetPassword} className="py-2 text-xl bg-slate-700 rounded-lg text-frost">
                  Reset Password
                </button>
              </>
            )}

            <p className="text-red-500">{message}</p>
          </div>
        )}

        <p className="underline cursor-pointer" onClick={() => setForgotPassword(!forgotPassword)}>
          {forgotPassword ? "Back to Login" : "Forgot your Password?"}
        </p>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="font-semibold cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
