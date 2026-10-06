import { Navigate } from 'react-router-dom';

export default function RoleGuard({ allowed = [], children }) {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    user = null;
  }

  if (!user || !allowed.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}