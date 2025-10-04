import React from 'react';
import '../styles/login.css';

const Login = () => {
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
