import React, {useState, useEffect} from 'react';
import './App.css';

import Login from './components/Login';
import PullRequestList from './components/PullRequestList'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      Github App
      <Login 
        setIsLoggedIn={setIsLoggedIn}
      />
      {
        isLoggedIn && 
        <div>
          <h3>Pull Requests</h3>
          <PullRequestList />
        </div>
      }
    </div>
  );
}

export default App;
