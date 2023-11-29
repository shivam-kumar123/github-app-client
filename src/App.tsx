// client/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const App = () => {
  const [webhookPayload, setWebhookPayload] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [githubUsername, setGitHubUsername] = useState<string | null>(null); // New state variable
  const socket = socketIOClient('https://github-app-server.onrender.com');

  useEffect(() => {
    socket.on('webhookEvent', (payload) => {
      console.log('Received webhook event:', payload);
      setWebhookPayload(payload);
    });
  }, [socket]);

  useEffect(() => {
    const fetchLastNotification = async () => {
      try {
        const response = await axios.get('https://github-app-server.onrender.com/last-notification');
        const lastNotification = response.data;

        if (lastNotification) {
          localStorage.setItem('notifications', JSON.stringify(lastNotification));
          setWebhookPayload(lastNotification);
        }
      } catch (error) {
        console.error('Error fetching last notification:', error);
      }
    };

    fetchLastNotification();
  }, [socket]);

  return (
    <div className="App">
      Github App
      {isLoggedIn && githubUsername && (
        <div className="user-info">Logged in as: {githubUsername}</div>
      )}
      <Login setIsLoggedIn={setIsLoggedIn} setGitHubUsername={setGitHubUsername} />
      {webhookPayload && (
        <div>
          <h3>Webhook Payload</h3>
          <div className="commit-box">
            {/* Render webhook payload details */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
