import './App.css';
import { Route , Routes } from 'react-router-dom';
import Chat from './Components/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
