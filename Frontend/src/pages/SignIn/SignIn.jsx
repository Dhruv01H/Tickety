import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const { setUser, updateAdminStatus } = useContext(AppContext);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState("signin"); // "signin", "forgot", "otp", "newpassword"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Add animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Add notification component
  const Notification = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setShowNotification(false);
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div 
        className={`fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-[200%]'
        }`}
        style={{
          animation: isVisible ? 'slideIn 0.5s ease-out' : 'slideOut 0.5s ease-in'
        }}
      >
        {message}
      </div>
    );
  };

  // Add this style block at the top of your component, before the return statement
  const styles = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(100%);
      }
    }
  `;

  // Handle Sign In
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", obj, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: 'include'
      });

      if (response.data) {
        // Update admin status using the new method
        updateAdminStatus(response.data.isAdmin || false);
        
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        
        try {
          const sessionResponse = await axios.get("http://localhost:8080/api/auth/session", {
            withCredentials: true,
          });

          if (sessionResponse.status === 200) {
            setUser(sessionResponse.data);
            // Double-check admin status from session
            if (sessionResponse.data.isAdmin !== undefined) {
              updateAdminStatus(sessionResponse.data.isAdmin);
            }
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            toast.error("Session issue. Please try logging in again.", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } catch (sessionError) {
          console.error("Session Fetch Error:", sessionError);
          setUser(null);
          updateAdminStatus(false);
          toast.error("Failed to fetch user session.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      
      // Handle specific error cases
      if (error.response?.data?.message === "Invalid Password" || error.response?.data === "Invalid Password") {
        toast.error("Incorrect password. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (error.response?.data?.message === "User not found" || error.response?.data === "User not found") {
        toast.error("Email not registered. Please sign up.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (error.response?.data?.message === "Email not verified" || error.response?.data === "Email not verified") {
        toast.error("Please verify your email before logging in.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(error.response?.data?.message || "Login failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // Send OTP to Email
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/sendOtp", { email });
      if (response.status === 200) {
        setFormState("otp");
        toast.success("OTP sent to your email!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error.message);
      toast.error("Failed to send OTP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setLoading(false);
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP...");
    try {
      const response = await axios.post("http://localhost:8080/api/auth/verifyOtp", {
        email: email,
        otp: otp
      });
      
      if (response.data.verified) {
        toast.success("OTP verified successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormState("newpassword");
      } else {
        toast.error("Invalid OTP. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      console.log("Resetting password for:", email);
      const response = await axios.post("http://localhost:8080/api/auth/forget-password", {
        email,
        password: newPassword,
      });

      if (response.status === 200) {
        toast.success("Password reset successful! Please login.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          setFormState("signin");
          setEmail("");
          setOtp("");
          setNewPassword("");
          setConfirmNewPassword("");
        }, 1000);
      }
    } catch (error) {
      console.error("Password Reset Error:", error.response?.data || error.message);
      toast.error("Failed to reset password. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className={`w-full max-w-md transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 mb-4 rounded-full bg-gradient-to-br from-primary/20 to-pink-600/20 shadow-lg shadow-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 text-lg">Sign in to continue your journey</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/5">
          {formState === "signin" && (
            <form onSubmit={handleForm} className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-10 pr-4 py-3.5 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full pl-10 pr-4 py-3.5 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setFormState("forgot")}
                  className="text-sm text-primary hover:text-pink-400 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-lg transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transform"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-primary hover:text-pink-400 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          )}

          {formState === "forgot" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-lg transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/30"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
              <button
                onClick={() => setFormState("signin")}
                className="w-full py-3 px-4 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {formState === "otp" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Enter OTP</h2>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary">
                  OTP Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Enter OTP"
                  />
                </div>
              </div>
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-lg transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/30"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {formState === "newpassword" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Set New Password</h2>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-lg transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/30"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {showNotification && <Notification message={message} />}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

export default SignIn;