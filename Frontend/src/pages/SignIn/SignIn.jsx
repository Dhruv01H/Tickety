import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext"; // Import AppContext

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext); // ✅ Get setUser from context
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", obj, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // ✅ Ensure session cookies are sent
      });

      if (response.data) {
        alert("Successful Login");

        // ✅ Fetch session data after successful login
        try {
          const sessionResponse = await axios.get("http://localhost:8080/api/auth/session", {
            withCredentials: true,
          });

          if (response.status === 200) {
            setUser(sessionResponse.data)
            // const email = sessionResponse.data.split(": ")[1]; // Extract email
            // setUser(email); // ✅ Update user context
            navigate("/"); // Redirect after setting user
          } else {
            alert("Session issue. Try logging in again.");
          }
        } catch (sessionError) {
          console.error("Session Fetch Error:", sessionError);
          setUser(null);
        }
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Something went wrong.");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center px-6 py-6 rounded-2xl bg-slate-300 min-w-[350px]">
          <form action="" onSubmit={handleForm} className="flex flex-col gap-4 mb-8">
            <h1 className="mb-4 text-3xl font-bold">Sign In</h1>
            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Email" className="text-lg" >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400"
                required
              />
            </div>

            <div className="flex flex-col items-start gap-2 mb-4">
              <label htmlFor="Password" className="text-lg">
                Password
              </label>
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

            <button
              type="submit"
              className="py-1.5 text-xl rounded-xl font-medium bg-slate-700 text-frost"
            >
              Sign In
            </button>
          </form>

          <p className="mb-2 underline cursor-pointer underline-offset-2">
            Forgot your Password?
          </p>

          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="font-semibold cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
