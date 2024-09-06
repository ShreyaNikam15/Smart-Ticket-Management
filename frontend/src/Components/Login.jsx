// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import VerifyOTP from "./VerifyOTP";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");
  const [verifyToken, setVerifyToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://smart-ticket-management.onrender.com/api/user/login", {
        phoneNo,
      });
      setMessage(response.data.message);
      setVerifyToken(response.data.verifyToken);
      console.log("OTP:", response.data.otp);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <section className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome to <br /> The Museum</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-icon">
            <BsTelephoneFill size={30} />
          </div>
          <label htmlFor="phone" className="login-label">
            Enter your phone number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            {loading && <CgSpinner size={20} className="spinner" />}
            <span>Send OTP</span>
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
        {verifyToken && <VerifyOTP verifyToken={verifyToken} />}
      </div>
    </section>
  );
};

export default Login;
