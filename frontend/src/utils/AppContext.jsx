import { createContext, useContext, useEffect, useState } from 'react';
import authClient from '../clients/authClient';

// Create context
const AppContext = createContext(null);

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, jobTitle }
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        // 🚀 ask server to validate cookie
        const result = await authClient.validateToken();
        setUser({ name: result.name, jobTitle: result.jobTitle });
        setTokenValid(true);
      } catch (err) {
        console.warn('Token invalid or missing:', err);
        setUser(null);
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  // 🔁 Updated logout
  const logout = async () => {
    try {
      await authClient.logout(); // 🚀 tell server to clear cookie
    } catch (err) {
      console.warn('Logout failed:', err);
    } finally {
      setUser(null);
      setTokenValid(false);
    }
  };

  return (
    <AppContext.Provider value={{ user, tokenValid, loading, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for convenient access
export const useAppContext = () => useContext(AppContext);
