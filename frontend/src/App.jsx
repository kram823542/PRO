import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Loader from './components/Loader.jsx';

// Pages
import Login from './pages/Login.jsx';
import Employee from './pages/Employee.jsx';
import AdminClf from './pages/AdminClf.jsx';
import AdminSuper from './pages/AdminSuper.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={
                user.role === 'SUPER_ADMIN'
                  ? '/admin-super'
                  : user.role === 'CLF_ADMIN'
                  ? '/admin-clf'
                  : '/employee'
              }
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/employee/*"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE']}>
            <Employee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-clf/*"
        element={
          <ProtectedRoute allowedRoles={['CLF_ADMIN']}>
            <AdminClf />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-super/*"
        element={
          <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
            <AdminSuper />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <Navigate
            to={
              user
                ? user.role === 'SUPER_ADMIN'
                  ? '/admin-super'
                  : user.role === 'CLF_ADMIN'
                  ? '/admin-clf'
                  : '/employee'
                : '/login'
            }
            replace
          />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;