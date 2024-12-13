// src/components/PublicRoute.tsx

import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If the user is already authenticated, redirect them to the /chat route
  if (user) {
    return <Navigate to="/chat" state={{ from: location }} />;
  }

  return children; // If the user is not authenticated, render the children (public route)
};

export default PublicRoute;
