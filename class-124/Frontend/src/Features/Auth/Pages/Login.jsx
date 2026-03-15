import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Mac Window */}
      <div className="w-[420px] bg-white shadow-2xl rounded-xl overflow-hidden">

        {/* MacOS top bar */}
        

        {/* Login content */}
        <div className="p-8">

          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-center text-sm mt-1">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </button>

          </form>

          {/* Bottom text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?
            <Link
              to="/register"
              className="text-black font-medium cursor-pointer ml-1"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}