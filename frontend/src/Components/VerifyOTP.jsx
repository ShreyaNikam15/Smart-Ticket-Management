// src/components/VerifyOTP.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VerifyOTP.css"; // Import the CSS file

const VerifyOTP = ({ verifyToken }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://smart-ticket-management.onrender.com/api/user/verify",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );
      setMessage(response.data.message);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      navigate("/chat");
    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="verify-otp-container">
      <h2 className="verify-otp-title">Verify OTP</h2>
      <form onSubmit={handleVerify} className="verify-otp-form">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="verify-otp-input"
        />
        <button type="submit" className="verify-otp-button">
          Verify OTP
        </button>
      </form>
      {message && <p className="verify-otp-message">{message}</p>}
      {user && <p className="verify-otp-welcome">Welcome, {user.phoneNo}!</p>}
    </div>
  );
};

export default VerifyOTP;
