import React, {useEffect} from 'react';
import axios from 'axios';

type Props = {
    setGithubToken: (githubToken: String | null) => void;
}

const Login = ({setGithubToken}: Props) => {

    const handleGithubLogin = async () => {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID);
    };

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get('code');
        console.log(codeParam);
        if (codeParam !== null) {
            setGithubToken(codeParam);
        }
    }, []);

  return (
    <div>
        <button onClick={handleGithubLogin}>
            Login With Github
        </button>
    </div>
  )
}

export default Login;
