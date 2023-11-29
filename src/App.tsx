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
    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);

  useEffect(() => {
    const fetchLastNotification = async () => {
      try {
        const response = await axios.get('https://github-app-server.onrender.com/last-notification');
        const lastNotification = response.data;
  
        if (lastNotification) {
          // Store the last notification in localStorage
          localStorage.setItem('notifications', JSON.stringify(lastNotification));
          setWebhookPayload(lastNotification);
        }
      } catch (error) {
        console.error('Error fetching last notification:', error);
      }
    };
  
    // Fetch the last notification when the component mounts
    fetchLastNotification();
  
    // ... (existing code)
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

