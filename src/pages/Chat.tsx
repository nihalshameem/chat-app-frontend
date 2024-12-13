import React, { useEffect, useId, useState } from 'react';

import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import { useAuth } from '../context/AuthContext';
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";
import axios from 'axios';
import { apiUri } from '../utils/envConfigs';
import { useMessage } from '../context/MessageContext';
import { errMsgInstance, MessageEntity } from '../utils/commonUtils';

const { Sider, Content } = Layout;

const Chat: React.FC = () => {
    const { user, logout } = useAuth(); // Assuming you have user and users in context
    const { showLoadingMessage, closeLoadingMessage, destroyMessage } = useMessage()

    // Dummy data for users (you should get this from your context or API)
    const [activeUser, setActiveUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<MessageEntity[]>([]);
    const id = useId()

    // Handle user selection
    const handleUserClick = (username: string) => {
        setActiveUser(username);
        // Handle further logic for starting a chat with the selected user
    };

    useEffect(() => {
        if (activeUser) {
            showLoadingMessage(id, "Fetching messages...")
            axios.post(`${apiUri}chat`, { userId: activeUser }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }).then((res) => {
                if (res.data.status === "success") {
                    setMessages(res.data.data)
                    destroyMessage(id)
                } else {
                    closeLoadingMessage(id, res.data.message, "error")
                }
            }).catch((e) => {
                closeLoadingMessage(id, errMsgInstance(e), "error")
            })
        }
    }, [activeUser])

    const SendMessage = (content: string, cb: () => void) => {
        if (activeUser) {
            showLoadingMessage(id, "Fetching messages...")
            let req: MessageEntity = {
                receiver: activeUser,
                content: content
            }
            axios.post(`${apiUri}chat/send`, req, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }).then((res) => {
                if (res.data.status === "success") {
                    setMessages([...messages, res.data.data])
                    destroyMessage(id)
                    cb()
                } else {
                    closeLoadingMessage(id, res.data.message, "error")
                }
            }).catch((e) => {
                closeLoadingMessage(id, errMsgInstance(e), "error")
            })
        }
    }

    return (
        <Layout style={{ height: '100vh' }}>
            {/* Sidebar with User List */}
            <Sider width="20%" style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
                <UserList activeUser={activeUser} selecter={handleUserClick} />

                {/* Logout Button at the bottom */}
                <div style={{ position: 'absolute', bottom: '20px', width: '-webkit-fill-available' }}>
                    <Button
                        type="primary"
                        danger
                        block
                        icon={<LogoutOutlined />}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
            </Sider>

            {/* Main Content Area */}
            <Layout style={{ padding: '20px' }}>
                <Content
                    style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        height: '100%',
                        borderRadius: '8px',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Your Chat UI content will go here */}
                    <h2>Welcome to the chat!</h2>
                    {activeUser && <ChatBox data={messages} send={SendMessage} />}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Chat;
