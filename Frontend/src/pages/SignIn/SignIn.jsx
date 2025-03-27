import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [error, setError] = useState("");

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
          withCredentials: true, // ✅ Ensure session cookies are sent
        }
      );

      if (response.data) {
        alert("Successful Login");

        // ✅ Fetch session data after successful login
        try {
          const sessionResponse = await axios.get(
            "http://localhost:8080/api/auth/session",
            {
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            setUser(sessionResponse.data);
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
     
    </>
  );
}

export default SignIn;
