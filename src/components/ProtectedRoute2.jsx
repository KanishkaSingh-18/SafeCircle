import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute2({ children }) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) return <div>Loading...</div>;
  if (!currentUser) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
