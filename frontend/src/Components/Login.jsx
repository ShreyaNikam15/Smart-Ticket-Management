// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import VerifyOTP from "./VerifyOTP";

const Login = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");
  const [verifyToken, setVerifyToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        phoneNo,
      });
      setMessage(response.data.message);
      setVerifyToken(response.data.verifyToken);
      // OTP is for testing purposes; remove it in production
      console.log("OTP:", response.data.otp);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      {message && <p>{message}</p>}
      {verifyToken && <VerifyOTP verifyToken={verifyToken} />}
    </div>
  );
};

export default Login;
