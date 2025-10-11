import '../styles/home.css';
import { useState } from 'react';
import authClient from '../clients/authClient';
import { useAppContext } from '../utils/AppContext';

const Workspace = () => {
  const { user, tokenValid, loading } = useAppContext();
  const authorizedJobTitles = ['Manager', 'Admin'];

  // 🕓 Wait while token is being validated
  if (loading) return <Loader />;

  // 🚫 Not authorized → render nothing
  if (!tokenValid || !authorizedJobTitles.includes(user?.jobTitle)) return null;

  // ✅ Authorized → render page
  return (
    <div className="home-container">
      <h1>Workspace</h1>
      <h3>This is a secret page. You should only see it if you're authorized.</h3>
    </div>
  );
};

export default Workspace;
