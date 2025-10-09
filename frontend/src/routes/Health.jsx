import React, { useState } from 'react';
import '../styles/health.css';
import healthClient from '../clients/healthClient';

const Health = () => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState('');

  const healthCheck = async () => {
    try {
      const data = await healthClient.getHealth();
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
      <h1>Do you hear a pulse?</h1>
      <button onClick={healthCheck}>Check API health</button>
      {message && <p>{message}</p>}
      {time && <p>{new Date(time).toLocaleString()}</p>}
      {uptime && <p>Uptime: {uptime}</p>}
    </div>
  );
};

export default Health;
