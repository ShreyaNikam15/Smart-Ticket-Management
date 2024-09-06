// src/components/VerifyOTP.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOTP = ({ verifyToken }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirection

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/verify",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );
      setMessage(response.data.message);
      setUser(response.data.user);
      // Store the user token in local storage for authenticated routes
      localStorage.setItem("token", response.data.token);
      navigate("/chat"); // Redirect to chat after successful verification
    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
      {user && <p>Welcome, {user.phoneNo}!</p>}
    </div>
  );
};

export default VerifyOTP;
