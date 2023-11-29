import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const App = () => {
  const [webhookPayload, setWebhookPayload] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
          <div className="commit-box">
            <p>Repository: {webhookPayload.repository.full_name}</p>
            <p>Repository: {webhookPayload.repository.full_name}</p>
            <p>Commit ID: {webhookPayload.head_commit.id}</p>
            <p>Author: {webhookPayload.head_commit.author.name}</p>
            <p>Message: {webhookPayload.head_commit.message}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

