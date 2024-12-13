import React, { useState } from 'react';
import { Input, Button, List, Typography, Space, Avatar } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { MessageEntity } from '../utils/commonUtils';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

type MessageType = 'sent' | 'received';

interface Message {
    id: number;
    content: string;
    type: MessageType; // To distinguish between sent and received messages
}

interface Props {
    data: MessageEntity[];
    send: (content: string, cb: () => void) => void;
}

const ChatBox: React.FC<Props> = ({ data, send }) => {
    const { user } = useAuth()
    const [newMessage, setNewMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            send(newMessage.trim(), () => setNewMessage(""))
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className='chat-box'>
            <Title level={3}>Chat</Title>

            <List
                dataSource={data}
                renderItem={(item, i) => (
                    <List.Item
                        key={i}
                        className={`single-msg ${item.sender === user.username ? 'sent' : 'received'}`}
                    >
                        <Space direction="vertical" align={item.sender === user.username ? 'end' : 'start'}>
                            <Typography.Text>
                                {item.content}
                            </Typography.Text>
                        </Space>
                    </List.Item>
                )}
            />
            <Space.Compact block size="large" className='send-btn-block'>
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}>Send</Button>
            </Space.Compact>
        </div>
    );
};

export default ChatBox;
