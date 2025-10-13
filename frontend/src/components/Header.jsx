import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../utils/AppContext';
import { useModalContext } from '../utils/ModalContext';
import './Header.css';

const Header = () => {
  const { tokenValid, user, loading, logout } = useAppContext();
  const { closeModal } = useModalContext();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // ✅ prevent navigation
    closeModal(); // Close any open modal
    logout();
    navigate('/login');
  };

  if (loading) return null;

  return (
    <header className="navbar">
      <div className="navbar-logo">
        SEP Business
        {tokenValid && user && (
          <span className="navbar-welcome">
            &nbsp; | &nbsp;{user.name} - {user.jobTitle}
          </span>
        )}
      </div>

      <nav className="navbar-links">
        {!tokenValid ? (
          <>
            <NavLink to="/health" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Health
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Login
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/workspace" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Workspace
            </NavLink>
            <NavLink to="/health" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Health
            </NavLink>
            <NavLink
              to=""
              onClick={handleLogout}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Logout
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
