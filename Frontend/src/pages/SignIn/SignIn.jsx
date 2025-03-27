import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

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
  const [loading, setLoading] = useState(false); // Loading state

  // Handle Sign In
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        obj,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data) {
        setMessage("Successful Login!");
        try {
          const sessionResponse = await axios.get(
            "http://localhost:8080/api/auth/session",
            {
              withCredentials: true,
            }
          );

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

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/sendOtp",
        { email }
      );
      if (response.status === 200) {
        setOtpSent(true);
        setMessage("OTP sent to your email.");
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      setMessage("Failed to send OTP. Try again.");
    }

    setLoading(false); // Stop loading
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verifyOtp",
        { email, otp }
      );

      if (response.status === 200) {
        setOtpVerified(true);
        setMessage("OTP Verified! Enter your new password.");
      } else {
        setMessage("Incorrect OTP. Try again.");
      }
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error.response?.data || error.message
      );
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
      const response = await axios.post(
        "http://localhost:8080/api/auth/forget-password",
        {
          email,
          password: newPassword,
        }
      );

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
      console.error(
        "Password Reset Error:",
        error.response?.data || error.message
      );
      setMessage("Failed to reset password. Try again.");
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div
          className="hidden w-1/2 h-full bg-center bg-cover md:block"
          style={{ backgroundImage: `url(${assets.abstractBg})` }}
        ></div>

        <div className="flex flex-col items-center justify-center w-full px-8 md:w-1/2 md:px-12">
          {!forgotPassword ? (
            // Form for Sign In
            <>
              <h2 className="mb-2 text-3xl font-semibold text-gray-800">
                Sign In to Tickety
              </h2>
              <p className="mb-6 text-gray-500">Glad to see you back</p>

              <form onSubmit={handleForm} className="w-full max-w-sm">
                <div className="mb-4">
                  <label htmlFor="email" className="font-medium text-gray-600">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="********"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    required
                    minLength={8}
                    maxLength={14}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 font-medium text-white transition duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary"
                >
                  Sign In
                </button>
              </form>
            </>
          ) : (
            // Forgot Password Flow
            <>
              <div className="w-full max-w-sm">
                <h2 className="mb-4 text-3xl font-semibold text-gray-800">
                  Forgot Password?
                </h2>

                {!otpSent && (
                  <>
                    <form>
                      <label
                        htmlFor="femail"
                        className="font-medium text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        name="femail"
                        type="email"
                        required
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mt-1 mb-6 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                      />

                      <button
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="w-full py-2 font-medium text-center text-white transition duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary"
                      >
                        {loading ? (
                          <sapn className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></sapn>
                        ) : (
                          "Send OTP"
                        )}
                      </button>
                    </form>
                  </>
                )}

                {otpSent && !otpVerified && (
                  <>
                    <form>
                      <label
                        htmlFor="enter"
                        className="font-medium text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="enter"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-2 mt-1 mb-6 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                      <button
                        onClick={handleVerifyOtp}
                        className="w-full py-2 font-medium text-white transition duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary"
                      >
                        Verify OTP
                      </button>
                    </form>
                  </>
                )}

                {otpVerified && (
                  <>
                    <form>
                      <div className="mb-4">
                        <label
                          htmlFor="newpassword"
                          className="font-medium text-gray-600"
                        >
                          New Password
                        </label>
                        <input
                          type="newpassword"
                          placeholder="**********"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                          maxLength={14}
                          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confnewpassword"
                          className="font-medium text-gray-600"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="confnewpassword"
                          placeholder="**********"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          required
                          minLength={8}
                          maxLength={14}
                          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={handleResetPassword}
                        className="w-full py-2 font-medium text-white transition duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary"
                      >
                        Reset Password
                      </button>
                    </form>
                  </>
                )}

                <p className="text-red-500">{message}</p>
              </div>
            </>
          )}

          <div className="flex items-center w-full max-w-sm mt-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500">
              <span
                onClick={() => setForgotPassword(!forgotPassword)}
                className="font-semibold cursor-pointer"
              >
                {forgotPassword ? "Back to Login" : "Forgot your Password?"}
              </span>
            </p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="flex items-center w-full max-w-sm my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="font-semibold cursor-pointer"
              >
                Sign Up
              </span>
            </p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
