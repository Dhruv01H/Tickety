import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

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

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/sendOtp",
        { email }
      );
      if (response.status === 200) {
        setFormState("otp");
        setMessage("OTP sent to your email.");
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      setMessage("Failed to send OTP. Try again.");
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
        console.log("OTP verification response:", response.data);
        
        if (response.data.verified) {
            console.log("OTP verified successfully");
            setMessage(response.data.message);
            setFormState("newpassword");
        } else {
            console.log("OTP verification failed");
            setMessage(response.data.message);
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        setMessage(error.response?.data?.message || "Error verifying OTP");

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
        // Only reset form state after successful password reset
        setTimeout(() => {
          setFormState("signin");
          setEmail("");
          setOtp("");
          setNewPassword("");
          setConfirmNewPassword("");
        }, 1000); // Give user time to see the success message
      }
    } catch (error) {

      console.error("Password Reset Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Failed to reset password. Try again.");
      // Don't change form state on error

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
                    className="w-full py-2 font-medium text-center text-white transition duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary disabled:opacity-70 disabled:cursor-not-allowed relative"
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
                    className="w-full py-3 font-medium text-white transition duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary shadow-md hover:shadow-lg"
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