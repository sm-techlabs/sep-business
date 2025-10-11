import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './routes/Login';
import Health from './routes/Health';
import Workspace from './routes/Workspace';

const routes = [
  { path: '/login', element: <Login />, protected: false },
  { path: '/health', element: <Health />, protected: false },
  { path: '/workspace', element: <Workspace />, protected: true },
  // {
  //   path: '/admin',
  //   element: <AdminDashboard />,
  //   protected: true,
  //   allowedRoles: ['Admin'],
  // },
];

function App() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
