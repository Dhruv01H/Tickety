import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [error,setError] = useState("");

  const handleForm = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());
    console.log(obj);
  
    if(obj.password != obj.confirmpassword){
      console.log(obj.password);
      console.log(obj.confirmpassword);
      alert("Password Does not match");
      window.location.reload();
      return;
    }
    else{
    try {
      
      const response = await axios.put('http://localhost:8080/api/auth/signup', obj ,{
        headers: {
          'Content-Type': 'application/json',
          },
      });
      if(response.data == "User Registration Successful"){
        alert("Please signin");
        navigate('/signin');
      }
      else{
        if(response.data == "Email Already Exists"){
          alert("Email Already Exists. Please SignIn");
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("");
    }

  }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center px-6 py-6 rounded-2xl bg-slate-300 min-w-[370px]">
          <form
            action=""
            onSubmit={handleForm}
            className="flex flex-col gap-4 mb-8"
          >
            <h1 className="mb-4 text-3xl font-bold">Sign Up</h1>
            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Username" className="text-lg">
                Username
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Username"
                className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400"
              />
            </div>

            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Email" className="text-lg">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400"
              />
            </div>

            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Phone" className="text-lg">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                minLength={10}
                maxLength={10}
                required
                className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400"
              />
            </div>

            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                minLength={8}
                maxLength={14}
                required
                className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400"
              />
            </div>

            <div className="flex flex-col items-start gap-2 mb-3">
              <label htmlFor="Confirm" className="text-lg">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                minLength={8}
                maxLength={14}
                required
                className="w-full px-3 py-1 text-xl rounded-lg text-frost outline-0 bg-slate-400"
              />
            </div>

            <button
              type="submit"
              className="py-1.5 text-xl rounded-xl font-medium bg-slate-700 text-frost"
            >
              Sign Up
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="font-semibold cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
