import React, { useState } from 'react';
import '../styles/home.css';
import { getApiBaseUrl } from '../config';

const Home = () => {

  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState('');

  const healthCheck = async () => {
    try {
      const response = await fetch(getApiBaseUrl('/api/health'));
      const data = await response.json();
      setMessage(data.message);
      setTime(data.time);
      setUptime(data.uptime);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching data');
    }
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <button onClick={healthCheck}>Check API health</button>
      {message && <p>{message}</p>}
      {time && <p>{new Date(time).toLocaleString()}</p>}
      {uptime && <p>Uptime: {uptime}</p>}
    </div>
  );
};

export default Home;
