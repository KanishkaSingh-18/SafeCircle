import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protect routes by checking Firebase auth state.
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // If auth is still initializing, show a simple loading message.
  if (currentUser === undefined) return <div>Loading...</div>;

  // If no user, redirect to login.
  if (!currentUser) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
