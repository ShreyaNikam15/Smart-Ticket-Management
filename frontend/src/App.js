import './App.css';
import { Route , Routes } from 'react-router-dom';
import Chat from './Components/Chat';
import QrCodeScanner from './Components/QrCodeScanner';
import Audio from './Components/Audio';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Chat" element={<Chat />} />
        <Route path="/QrCodeScanner" element={<QrCodeScanner />} />
        <Route path="/Audio" element={<Audio />} />
      </Routes>
    </div>
  );
}

export default App;
