import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PullRequestList = () => {
  const [pullRequests, setPullRequests] = useState([]);

  useEffect(() => {
    // const fetchPullRequests = async () => {
    //   try {
    //     const response = await axios.get('https://api.github.com/repos/owner/repo/pulls');
    //     setPullRequests(response.data);
    //   } catch (error) {
    //     console.error('Error fetching pull requests:', error);
    //   }
    // };

    // fetchPullRequests();
  }, []);

  return (
    <div>
      <h2>Pull Requests</h2>
      <ul>
        {/* {pullRequests.map((pr) => (
          <li key={pr.id}>{pr.title}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default PullRequestList;
