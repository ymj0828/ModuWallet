import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return !user ? <>{children}</> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
