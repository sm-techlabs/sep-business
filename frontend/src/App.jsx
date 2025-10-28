import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './routes/Login';
import Health from './routes/Health';
import Workspace from './routes/Workspace';
import Modal from './components/Modal';
import { useModalContext } from './utils/ModalContext';
import { useEffect } from 'react';
import WorkflowGuide from './components/WorkflowGuide';

const routes = [
  { path: '/login', element: <Login />, protected: false },
  { path: '/health', element: <Health />, protected: false },
  { path: '/workspace', element: <Workspace />, protected: true },
];

function App() {

  const location = useLocation();
  const { closeModal } = useModalContext();

  useEffect(() => {
    closeModal(); // close modal on any route change
  }, [location.pathname]);


  return (
    <>
      <Header />
      <Modal />
        <Routes>
          {routes.map(({ path, element, protected: isProtected, allowedRoles }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute allowedRoles={allowedRoles}>
                    {element}
                  </ProtectedRoute>
                ) : (
                  element
                )
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/workspace" replace />} />
        </Routes>
        <WorkflowGuide />
      <Footer />
    </>
  );
}

export default App;
