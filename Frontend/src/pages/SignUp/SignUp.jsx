import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
      alert("Password does not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put("http://localhost:8080/api/auth/signup", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data === "User Registration Successful") {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/signin");
        }, 3000);
      } else if (response.data === "Email Already Exists") {
        alert("Email Already Exists. Please Sign In.");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Verification Link Sent!</h2>
            <p className="text-gray-600">Check your email to verify your account.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center px-6 py-6 rounded-2xl bg-slate-300 min-w-[370px]">
          <form onSubmit={handleForm} className="flex flex-col gap-4 mb-8">
            <h1 className="mb-4 text-3xl font-bold">Sign Up</h1>

            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Username" className="text-lg">Username</label>
              <input type="text" name="name" required placeholder="Username" className="w-full px-3 py-1 text-xl rounded-lg bg-slate-400 outline-0" />
            </div>

            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Email" className="text-lg">E-mail</label>
              <input type="email" name="email" required placeholder="E-mail" className="w-full px-3 py-1 text-xl rounded-lg bg-slate-400 outline-0" />
            </div>

            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Phone" className="text-lg">Phone</label>
              <input type="tel" name="phone" required minLength={10} maxLength={10} placeholder="Phone" className="w-full px-3 py-1 text-xl rounded-lg bg-slate-400 outline-0" />
            </div>

            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Password" className="text-lg">Password</label>
              <input type="password" name="password" required minLength={8} maxLength={14} placeholder="Password" className="w-full px-3 py-1 text-xl rounded-lg bg-slate-400 outline-0" />
            </div>

            <div className="flex flex-col items-start gap-2 mb-3">
              <label htmlFor="Confirm" className="text-lg">Confirm Password</label>
              <input type="password" name="confirmpassword" required minLength={8} maxLength={14} placeholder="Confirm Password" className="w-full px-3 py-1 text-xl rounded-lg bg-slate-400 outline-0" />
            </div>

            <button type="submit" disabled={loading} className="py-1.5 text-xl rounded-xl font-medium bg-slate-700 text-white flex justify-center items-center">
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="4" strokeOpacity="0.25"></circle>
                    <path d="M4 12a8 8 0 018-8m4 4a8 8 0 01-8 8" strokeWidth="4"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p>
            Already have an account? {" "}
            <span onClick={() => navigate("/signin")} className="font-semibold cursor-pointer">Sign In</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;