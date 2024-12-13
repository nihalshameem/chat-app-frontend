// src/components/PrivateRoute.tsx

import React, { JSX, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children; // If user is authenticated, render the children (protected route)
};

export default PrivateRoute;
