import '../styles/home.css';
import { useEffect, useState } from 'react';
import authClient from '../clients/authClient';

const Home = () => {
  
  const authorizedJobTitles = [
    'Manager', 
    'Admin',
  ];

  const [validationResult, setValidationResult] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    try {
      const result = await authClient.validateToken();
      const message = `Welcome ${result.name} - ${result.jobTitle}!\nToken validated successfully.`;
      setValidationResult(message);
    } catch (err) {
      setValidationResult(err.response.data.message || 'Validation failed');
    }
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const result = await authClient.validateToken();
        if (authorizedJobTitles.includes(result.jobTitle)) {
          setIsAuthorized(true);
        }
      } catch (err) {
        console.warn('Token validation failed:', err);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  // ⏳ Optional: show nothing or a small loader while checking auth
  if (loading) return null;

  // 🚫 Not authorized → render nothing
  if (!isAuthorized) return null;

  // ✅ Authorized → render page
  return (
    <div className="home-container">
      <h1>Home</h1>
      <h3>This is a secret page. You should only see it if you're authorized.</h3>
      <button onClick={validateToken}>Validate Current Token</button>
      {validationResult && (
        <div className="validation-result">
          <pre>{validationResult}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
