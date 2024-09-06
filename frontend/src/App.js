import './App.css';
import { Route , Routes } from 'react-router-dom';
import Chat from './Components/Chat';
import QrCodeScanner from './Components/QrCodeScanner';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Chat" element={<Chat />} />
        <Route path="/QrCodeScanner" element={<QrCodeScanner />} />
      </Routes>
    </div>
  );
}

export default App;
