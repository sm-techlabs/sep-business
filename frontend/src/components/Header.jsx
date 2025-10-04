import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">SEP Business</div>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
