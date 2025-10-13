import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Login from './routes/Login';
import EventRequestForm from './routes/EventRequestForm';
import './styles/global.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event-request" element={<EventRequestForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;