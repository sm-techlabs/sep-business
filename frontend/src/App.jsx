import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Health from './routes/Health';
import Login from './routes/Login';
import './styles/global.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';

const routes = [
  { path: '/', element: <Home />, protected: true },
  { path: '/login', element: <Login />, protected: false },
  { path: '/health', element: <Health />, protected: false },
];

function App() {
  return (
    <>
      <Header />

        <Routes>
          {routes.map(({ path, element, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
            />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
