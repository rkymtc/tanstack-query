import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { PostProvider } from '../context/PostContext';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <UserProvider>
      <PostProvider>
        {children}
      </PostProvider>
    </UserProvider>
  );
} 