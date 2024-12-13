import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Chat from './pages/Chat';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { Layout } from 'antd';
import { MessageProvider } from './context/MessageContext';


const App: React.FC = () => {
  return (
    <MessageProvider>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Public Route for Login and Register (only accessible when not logged in) */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Private Route for Chat (only accessible when logged in) */}
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Layout>
    </MessageProvider>
  );
};

export default App;
