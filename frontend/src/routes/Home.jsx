import React, { useState } from 'react';
import '../styles/home.css';
import { API_BASE_URL } from '../config';

const Home = () => {

  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hello`);
      const data = await response.json();
      setMessage(data.message);
      setTime(data.time);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching data');
    }
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <button onClick={handleClick}>Say hi to the API</button>
      {message && <p>{message}</p>}
      {time && <p>{time}</p>}
    </div>
  );
};

export default Home;
