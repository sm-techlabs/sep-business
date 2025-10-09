import React from 'react';
import '../styles/login.css';

const Login = () => {

  const handleLogin = async () => {
  try {
    const { token, message } = await authClient.login({ username, password });
    authClient.setToken(token);
    console.log(message);
    window.location.href = '/';
  } catch (err) {
    alert('Invalid username or password');
  }
};

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
