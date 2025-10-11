import React from 'react';
import authClient from '../clients/authClient';
import '../styles/login.css';

const Login = () => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginResult, setLoginResult] = React.useState(null);
  

  const handleLogin = async () => {
  try {
    const response = await authClient.login({ username, password });
    // setLoginResult(response.message);
    window.location.href = '/';
  } catch (err) {
    setLoginResult(err.response.data.error);
  }
};

  return (
    <div className="login-container">
      <h1>SEP Employee Portal</h1>
      <form onSubmit={(e) => {
        e.preventDefault(); // stop default reload
        handleLogin();
      }}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        {loginResult && (
        <div className="login-result">
          <pre>{JSON.stringify(loginResult, null, 2)}</pre>
        </div>
      )}
      </form>
      
    </div>
  );
};

export default Login;
