import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Usuario no autenticado, redirigir a /login
    return <Navigate replace to="/login" />;
  }
  // Usuario autenticado, renderizar el componente solicitado
  return children;
};

export default ProtectedRoute;