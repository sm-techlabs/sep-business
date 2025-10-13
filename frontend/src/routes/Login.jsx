import React from 'react';
import authClient from '../clients/authClient';
import Loader from '../components/Loader';
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginResult, setLoginResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setLoginResult(null);

    try {
      const response = await authClient.login({ username, password });
      setLoginResult(response.message);

      // ✅ short pause before redirect
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
    } catch (err) {
      setLoginResult(err?.response?.data?.error || 'Login failed');
      setLoading(false);
    }
  };

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  return (
    <div className="login-container">
      <h1>SEP Employee Portal</h1>

      {loading ? (
        <div style={{ marginTop: '2rem' }}>
          <Loader text="Logging in..." />
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid) handleLogin();
          }}
        >
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            value={username}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
          />
          <button type="submit" disabled={!isFormValid}>
            Login
          </button>

          {loginResult && (
            <div className="login-result">
              <pre>{JSON.stringify(loginResult, null, 2)}</pre>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Login;
