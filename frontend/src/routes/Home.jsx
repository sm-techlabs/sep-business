import React, { useState } from 'react';
import '../styles/home.css';

const Home = () => {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching data');
    }
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <button onClick={handleClick}>Call API</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;
