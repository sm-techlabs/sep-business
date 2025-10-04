import React from 'react';
import './Footer.css';
import packageJson from '../../package.json';

const Footer = () => {
  const version = packageJson.version;

  return (
    <footer className='app-footer'>
      <p>&copy; Group 17 - SEP Business v{version}</p>
    </footer>
  );
};

export default Footer;
