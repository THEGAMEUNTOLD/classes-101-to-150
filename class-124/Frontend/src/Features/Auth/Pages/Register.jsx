import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../App/Hooks/useAuth";


export default function Register() {
  const { handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleRegister(
        formData.email,
        formData.username,
        formData.password
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Mac style dots */}


        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Account
        </h2>

        <p className="text-gray-500 text-center text-sm mt-1 mb-10">
          Sign up to start using the platform
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-black font-medium cursor-pointer ml-1">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}