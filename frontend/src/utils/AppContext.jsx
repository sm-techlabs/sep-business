import { createContext, useContext, useEffect, useState } from 'react';
import authClient from '../clients/authClient';

// Create context
const AppContext = createContext(null);

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // { name, jobTitle }
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        const result = await authClient.validateToken();
        setUser({ name: result.name, jobTitle: result.jobTitle });
        setTokenValid(true);
      } catch (err) {
        console.warn('Token invalid or missing:', err);
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  return (
    <AppContext.Provider value={{ user, tokenValid, loading }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for convenient access
export const useAppContext = () => useContext(AppContext);
