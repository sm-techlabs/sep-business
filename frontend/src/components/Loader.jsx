import React from 'react';
import './Loader.css';

const Loader = ({ text }) => {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
};

export default Loader;
