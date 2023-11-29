import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const App = () => {
  const [webhookPayload, setWebhookPayload] = useState<any>(null);
  const [githubToken, setGithubToken] = useState<String | null>('');
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch repositories after login
        const sendingGithubToken = await axios.post('https://github-app-server.onrender.com', githubToken);
        const response = await axios.get('https://github-app-server.onrender.com/fetch-repos');
        const repos = response.data.repos;

        // Create webhooks for the fetched repositories
        await axios.post('https://github-app-server.onrender.com/create-webhooks', { repos });
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    if (githubToken !== null) {
      fetchData();
    }
  }, [githubToken]);

  return (
    <div className="App">
      Github App
      <Login setGithubToken={setGithubToken} />
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

