import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import Login from '@pages/Login';
import { AuthContextProvider } from './providers/AuthProvider';

import io from 'socket.io-client';
import config from '@config';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const socket = io.connect(config.server);

function App() {
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });
  }, [socket]);

  useEffect(() => {
    if (connected !== null) {
      if (connected) toast('Server is connected!', { type: 'success' });
      else toast('Server is disconnected!', { type: 'error' });
    }
  }, [connected]);

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
