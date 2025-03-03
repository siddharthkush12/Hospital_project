import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData({ ...formData, role: formData.role === "user" ? "admin" : "user" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, formData);
      navigate("/");
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-end p-6">
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hospital.jpg')" }}
      >
        
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      
      <div className="relative w-full max-w-md p-6 bg-white bg-opacity-95 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

        {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="mt-4 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          
          <div className="flex items-center justify-center space-x-4">
            <label className="text-gray-700">User</label>
            <div
              onClick={handleToggle}
              className={`w-12 h-6 rounded-full cursor-pointer flex items-center px-1 ${
                formData.role === "admin" ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"
              }`}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
            </div>
            <label className="text-gray-700">Admin</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span onClick={() => navigate("/")} className="text-blue-500 cursor-pointer hover:underline">
            Go to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;