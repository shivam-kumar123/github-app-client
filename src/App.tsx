import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import socketIOClient from 'socket.io-client';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [webhookPayload, setWebhookPayload] = useState<any>(null);
  const socket = socketIOClient('https://github-app-server.onrender.com'); // Replace with your server URL

  useEffect(() => {
    // Listen for 'webhookEvent' from the server
    socket.on('webhookEvent', (payload) => {
      console.log('Received webhook event:', payload);
      setWebhookPayload(payload);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="App">
      Github App
      <Login setIsLoggedIn={setIsLoggedIn} />
      {webhookPayload && (
        <div>
          <h3>Webhook Payload</h3>
          <pre>{JSON.stringify(webhookPayload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
