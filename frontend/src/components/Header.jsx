import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">SEP Business</div>
      <nav className="navbar-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Workspace
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
          Login
        </NavLink>
        <NavLink to="/health" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Health
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
