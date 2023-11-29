// client/components/Login.tsx
import React, { useEffect } from 'react';
import axios from 'axios';

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setGitHubUsername: (username: string) => void;
};

const Login = ({ setIsLoggedIn, setGitHubUsername }: Props) => {
  const handleGithubLogin = async () => {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=' + process.env.REACT_APP_CLIENT_ID
    );
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    const fetchGitHubUser = async () => {
      if (codeParam !== null) {
        const response = await axios.post('https://github-app-server.onrender.com', { code: codeParam });
        const githubToken = response.data.access_token;

        try {
          // Fetch the GitHub user details using the access token
          const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${githubToken}`,
            },
          });

          const githubUsername = userResponse.data.login;

          // Set the GitHub username in the state
          setGitHubUsername(githubUsername);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error fetching GitHub user details:', error);
        }
      }
    };

    fetchGitHubUser();
  }, [setIsLoggedIn, setGitHubUsername]);

  return (
    <div>
      <button onClick={handleGithubLogin}>Login With Github</button>
    </div>
  );
};

export default Login;
