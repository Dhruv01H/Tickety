import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());
    console.log(obj);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center px-6 py-6 rounded-2xl bg-slate-300 min-w-[350px]">
          <form action="" onSubmit={handleForm} className="flex flex-col gap-4 mb-8">
            <h1 className="mb-4 text-3xl font-bold">Sign In</h1>
            <div className="flex flex-col items-start gap-2 mb-1">
              <label htmlFor="Email" className="text-lg">
                E-mail
              </label>
              <input
                type="email"
                name="Email"
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
                name="Password"
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
