import React, { useState } from 'react';
import '../styles/health.css';
import healthClient from '../clients/healthClient';
import authClient from '../clients/authClient';
import Loader from '../components/Loader';

const Health = () => {
  const [healthInfo, setHealthInfo] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  const healthCheck = async () => {
    try {
      const data = await healthClient.getHealth();
      const formatted = `
📡 Health Check Successful
--------------------------
Message : ${data.message}
Time    : ${new Date(data.time).toLocaleString()}
Uptime  : ${data.uptime}
`;
      setHealthInfo(formatted);
    } catch (error) {
      console.error('Error fetching health:', error);
      setHealthInfo('❌ Error fetching health data. Please try again later.');
    }
  };

  const validateToken = async () => {
    try {
      const result = await authClient.validateToken();
      const message = `
✅ Token Validation Successful
------------------------------
Welcome ${result.name} (${result.jobTitle})
`;
      setValidationResult(message);
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Token validation failed.';
      setValidationResult(msg);
    }
  };

  return (
    <div className="health-container">
      <h1>Do you hear a pulse?</h1>

      <button onClick={healthCheck}>Check API Health</button>
      {healthInfo && <pre className="health-output">{healthInfo}</pre>}

      <button onClick={validateToken}>Validate Current Token</button>
      {validationResult && (
        <div className="validation-result">
          <pre>{validationResult}</pre>
        </div>
      )}
    </div>
  );
};

export default Health;
