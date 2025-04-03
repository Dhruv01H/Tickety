import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());

    if (obj.password !== obj.confirmpassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/auth/signup",
        obj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data === "User Registration Successful") {
        toast.success("Registration successful! Please check your email for verification.", {
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else if (response.data === "Email Already Exists") {
        toast.error("Email already exists. Please sign in.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">
              Verification Link Sent!
            </h2>
            <p className="text-gray-600">
              Check your email to verify your account.
            </p>
          </div>
        </div>
      )}

      <div className="flex h-screen">
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

          <h2 className="mb-2 text-3xl font-semibold text-gray-800">
            Sign Up to Tickety
          </h2>
          <p className="mb-6 text-gray-500">Start your journey</p>

          <form className="w-full max-w-sm" onSubmit={handleForm}>
            <div className="mb-4">
              <label htmlFor="Username" className="font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Username"
                disabled={loading}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-600"
              >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Phone" className="font-medium text-gray-600 ">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                required
                minLength={10}
                maxLength={10}
                placeholder="Phone"
                disabled={loading}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                minLength={8}
                maxLength={14}
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Confirm" className="font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                required
                minLength={8}
                maxLength={14}
                placeholder="Confirm Password"
                disabled={loading}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 font-medium text-white transition duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                      strokeOpacity="0.25"
                    ></circle>
                    <path
                      d="M4 12a8 8 0 018-8m4 4a8 8 0 01-8 8"
                      strokeWidth="4"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="flex items-center w-full max-w-sm my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="font-semibold cursor-pointer"
              >
                Sign In
              </span>
            </p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </div>

        <div
          className="hidden w-1/2 h-full bg-center bg-cover md:block"
          style={{ backgroundImage: `url(${assets.abstractBg})` }}
        ></div>
      </div>
    </>
  );
}

export default SignUp;
