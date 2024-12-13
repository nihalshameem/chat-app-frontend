import React, { createContext, useState, ReactNode, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { apiUri, socketUri } from '../utils/envConfigs';
import { UserEntity } from '../utils/commonUtils';
import { io } from 'socket.io-client';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (email: string, password: string) => void;
    onlineUsers: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const socket = io(socketUri);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserEntity | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const navigate = useNavigate();

    const socketRef = useRef<any>(null); // To keep socket instance

    useEffect(() => {
        // Establish socket connection
        socketRef.current = socket; // Replace with your server URL

        // Listen for the "online-users" event and update the state
        socketRef.current.on('online-users', (users: string[]) => {
            console.log("🚀 ~ socketRef.current.on ~ users:", users)
            setOnlineUsers(users); // Update the users state with the list of online users
        });

        const handleTabClose = () => socket.disconnect()

        window.addEventListener('beforeunload', handleTabClose);

        return () => {
            window.removeEventListener('beforeunload', handleTabClose);
        };

    }, []);

    const login = async (username: string, password: string) => {
        const response = await axios.post(`${apiUri}auth/login`, { username, password });
        socket.emit('join', response.data.data.username);
        setUser(response.data.data);
        navigate('/chat');
    };

    const register = async (username: string, password: string) => {
        const response = await axios.post(`${apiUri}auth/register`, { username, password });
        setUser(response.data.data);
        navigate('/chat');
    };

    const logout = () => {
        setUser(null);
        socket.disconnect()
        navigate('/'); // Redirect to home on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, onlineUsers }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };