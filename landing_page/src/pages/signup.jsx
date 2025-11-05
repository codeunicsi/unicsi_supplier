import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import InputField from "../components/InputField";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "vendor",
    otp: "",
  });

  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate email format using regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // STEP 1️⃣: Send OTP to user’s email
  const handleSendOtp = async () => {
    if (!isValidEmail(form.email)) {
      return setMessage("Please enter a valid email address");
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/send-otp", { email: form.email });
      setMessage(res.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2️⃣: Verify the entered OTP
  const handleVerifyOtp = async () => {
    if (!form.otp) {
      return setMessage("Please enter OTP");
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", {
        email: form.email,
        otp: form.otp,
      });
      setMessage(res.data.message);
      setOtpVerified(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3️⃣: Complete signup (only after OTP verified)
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      return setMessage("Please verify your email before signing up");
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/signup", {
        ...form,
        otpVerified: true, // ✅ send verified flag
      });
      setMessage(res.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg p-8 rounded-xl w-3/5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">
          Verify your email before completing signup
        </p>

        {/* Name */}
        <InputField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        {/* Email */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <InputField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
            />
          </div>

          {/* Send OTP Button */}
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || otpSent}
            className={`px-3 py-3 mt-2.5 rounded-md text-sm font-semibold ${
              otpSent
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-[#943A09] text-white hover:bg-amber-800"
            }`}
          >
            {otpSent ? "Sent" : loading ? "Sending..." : "Send OTP"}
          </button>
        </div>

        {/* OTP Field (visible only if OTP is sent) */}
        {otpSent && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1">
              <InputField
                label="Enter OTP"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter the OTP"
              />
            </div>

            {/* Verify OTP Button */}
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading || otpVerified}
              className={`px-3 py-3 mt-2.5 rounded-md text-sm font-semibold ${
                otpVerified
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : "bg-blue-700 text-white hover:bg-blue-800"
              }`}
            >
              {otpVerified ? "Verified" : loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        )}

        {/* Password */}
        <InputField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter password"
        />

        {/* Role */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="vendor">Vendor</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          disabled={!otpVerified || loading}
          className={`w-full py-2 rounded-lg font-medium ${
            otpVerified
              ? "bg-[#943A09] text-white hover:bg-amber-800"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-red-600">{message}</p>
        )}

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#943A09] cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
