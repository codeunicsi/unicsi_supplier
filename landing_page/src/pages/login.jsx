import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import InputField from "../components/InputField";
import { login, isAuthenticated } from "../utils/auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const { token, data } = res.data;

      // Save login data
      login(token, data.role);

      // Redirect based on role
      if (data.role === "SUPPLIER") {
        window.location.href = "/profile";
      } else {
        window.location.href = "/order";
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };


  useEffect(() => {
    if(isAuthenticated()) {
        navigate("/profile");
    }
  },[])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>

        <InputField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          type="email"
        />
        <InputField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          type="password"
        />

        <button
          type="submit"
          className="bg-amber-700 w-full text-white font-medium py-2 rounded-lg hover:bg-amber-800"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-red-600">{message}</p>
        )}

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#943A09] cursor-pointer font-semibold"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
