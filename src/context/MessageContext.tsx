import React, { createContext, useContext, ReactNode } from 'react';

import { message } from 'antd';

type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

interface MessageContextType {
    showMessage: (msg: string, type: MessageType, duration?: number) => void;
    showLoadingMessage: (id: string, msg?: string) => void;
    closeLoadingMessage: (id: string, type?: MessageType, msg?: string) => void;
    destroyMessage: (id: string) => void
}

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessage = (): MessageContextType => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};


export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Function to display messages
    const showMessage = (msg: string, type: MessageType, duration: number = 5) => {
        message.open({
            type: type,
            content: msg,
            duration: duration,
            style: {
                marginTop: '10vh',
                cursor: 'pointer'
            },
            onClick: () => {
                message.destroy()
            }
        });
    };
    const showLoadingMessage = (id: string, msg: string = "Fetching data, please wait...") => {
        message.open({
            key: id,
            type: "loading",
            content: msg,
            duration: 0
        });
    };

    const closeLoadingMessage = (id: string, type: MessageType = "success", msg: string = "Completed") => {
        message.open({
            type: type,
            content: msg,
            style: {
                marginTop: '10vh',
                cursor: 'pointer'
            },
            key: id
        })
    };

    const destroyMessage = (id: string) => {
        message.destroy(id);
    };

    return (
        <MessageContext.Provider value={{ showMessage, showLoadingMessage, closeLoadingMessage, destroyMessage }}>
            {children}
        </MessageContext.Provider>
    );
};
