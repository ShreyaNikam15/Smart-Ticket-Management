// src/App.js
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Chat from './Components/Chat';
import QrCodeScanner from './Components/QrCodeScanner';
import Audio from './Components/Audio';
import Login from './Components/Login.jsx'; // Import Login Component
import VerifyOTP from './Components/VerifyOTP'; // Import VerifyOTP Component

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route for login */}
        <Route path="/verify" element={<VerifyOTP />} /> {/* Route for OTP verification */}
        <Route path="/chat" element={<Chat />} /> {/* Protected route for chat */}
        <Route path="/QrCodeScanner" element={<QrCodeScanner />} />
        <Route path="/Audio" element={<Audio />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown paths */}
      </Routes>
    </div>
  );
}

export default App;
