import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState("signin"); // "signin", "forgot", "otp", "newpassword"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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
      });

      if (response.data) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });
        try {
          const sessionResponse = await axios.get("http://localhost:8080/api/auth/session", {
            withCredentials: true,
          });

          if (sessionResponse.status === 200) {
            setUser(sessionResponse.data);
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
    <>
      <style>{styles}</style>
      {showNotification && <Notification message="Login Successful!" />}
      <div className="flex h-screen">
        <div
          className="hidden w-1/2 h-full bg-center bg-cover md:block"
          style={{ backgroundImage: `url(${assets.abstractBg})` }}
        ></div>

        <div className="flex flex-col items-center justify-center w-full px-8 md:w-1/2 md:px-12 relative">
          {/* Close Button */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-8 right-8 text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {formState === "signin" ? (
            // Sign In Form

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
                    placeholder=""
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

          ) : formState === "forgot" ? (
            // Forgot Password Email Form

            <>
              <div className="w-full max-w-sm">
                <h2 className="mb-4 text-3xl font-semibold text-gray-800">
                  Forgot Password?
                </h2>
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
                    className="relative w-full py-2 font-medium text-center text-white transition duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 mr-2">
                          <svg className="animate-spin" viewBox="0 0 24 24">
                            <circle 
                              className="opacity-25" 
                              cx="12" 
                              cy="12" 
                              r="10" 
                              stroke="currentColor" 
                              strokeWidth="4"
                              fill="none"
                            />
                            <path 
                              className="opacity-75" 
                              fill="currentColor" 
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </div>
                        <span>Sending OTP...</span>
                      </div>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : formState === "otp" ? (
            // OTP Verification Form
            <>
              <div className="w-full max-w-sm">
                <h2 className="mb-4 text-3xl font-semibold text-gray-800">
                  Enter OTP
                </h2>
                <form>
                  <label
                    htmlFor="enter"
                    className="font-medium text-gray-600"
                  >
                    Enter OTP
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
              </div>
            </>
          ) : (
            // New Password Form
            <>
              <div className="w-full max-w-sm">
                <h2 className="mb-4 text-3xl font-semibold text-gray-800">
                  Set New Password
                </h2>
                <form>
                  <div className="mb-6">
                    <label
                      htmlFor="newpassword"
                      className="font-medium text-gray-600"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newpassword"
                      placeholder="**********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      maxLength={14}
                      className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="confnewpassword"
                      className="font-medium text-gray-600"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confnewpassword"
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
                    className="w-full py-3 font-medium text-white transition duration-300 rounded-lg shadow-md cursor-pointer bg-primary hover:bg-secondary hover:shadow-lg"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </>
          )}

          <div className="flex items-center w-full max-w-sm mt-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500">
              <span
                onClick={() => {
                  if (formState !== "newpassword") {
                    setFormState(formState === "signin" ? "forgot" : "signin");
                  }
                }}
                className="font-semibold cursor-pointer"
              >
                {formState === "signin" ? "Forgot your Password?" : "Back to Login"}
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


          <p className="text-red-500">{message}</p>

        </div>
      </div>
    </>
  );
}

export default SignIn;