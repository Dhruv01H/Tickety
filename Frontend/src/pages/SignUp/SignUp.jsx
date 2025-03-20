import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Signup Form, Step 2: OTP Verification
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());

    if (obj.password !== obj.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setEmail(obj.email); // Save email for OTP verification
      const response = await axios.post("http://localhost:8080/api/auth/send-otp", { email: obj.email });
      if (response.data === "OTP Sent") {
        setStep(2); // Move to OTP verification step
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Error sending OTP. Try again.");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/verify-otp", { email, otp });
      if (response.data === "OTP Verified") {
        alert("Registration successful! Please sign in.");
        navigate("/signin");
      } else {
        setError("Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Error verifying OTP. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center px-6 py-6 rounded-2xl bg-slate-300 min-w-[370px]">
        {step === 1 ? (
          <form onSubmit={handleForm} className="flex flex-col gap-4 mb-8">
            <h1 className="mb-4 text-3xl font-bold">Sign Up</h1>
            <InputField label="Username" name="name" type="text" required />
            <InputField label="E-mail" name="email" type="email" required />
            <InputField label="Phone" name="phone" type="tel" minLength={10} maxLength={10} required />
            <InputField label="Password" name="password" type="password" minLength={8} maxLength={14} required />
            <InputField label="Confirm Password" name="confirmpassword" type="password" minLength={8} maxLength={14} required />
            <button type="submit" className="py-1.5 text-xl rounded-xl font-medium bg-slate-700 text-frost">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification} className="flex flex-col gap-4 mb-8">
            <h1 className="mb-4 text-3xl font-bold">OTP Verification</h1>
            <p className="text-lg">Enter the OTP sent to {email}</p>
            <InputField label="OTP" name="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <button type="submit" className="py-1.5 text-xl rounded-xl font-medium bg-green-600 text-white">Verify OTP</button>
          </form>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <p>
          Already have an account? <span onClick={() => navigate("/signin")} className="font-semibold cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
}

function InputField({ label, name, type, ...props }) {
  return (
    <div className="flex flex-col items-start gap-2 mb-1">
      <label htmlFor={name} className="text-lg">{label}</label>
      <input type={type} name={name} placeholder={label} className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400" {...props} />
    </div>
  );
}

export default SignUp;
