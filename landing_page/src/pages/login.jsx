import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import InputField from "../components/InputField";
import { login, isAuthenticated } from "../utils/auth";

const ThemeLoader = () => (
  <div
    className="w-12 h-12 rounded-full border-4 border-solid animate-spin"
    style={{
      borderColor: "transparent",
      borderImage: "linear-gradient(135deg, #0097b2 0%, #7ed957 100%) 1",
    }}
  />
);

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <ThemeLoader />
        </div>
      )}
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
          disabled={loading}
          className="w-full text-white font-medium py-2 rounded-lg transition-opacity flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-red-600">{message}</p>
        )}

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#0097b2] cursor-pointer font-semibold hover:text-[#7ed957] transition-colors"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
