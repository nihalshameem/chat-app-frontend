import React, { useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import { Button, Typography, Layout, Row, Col, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Home: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/chat'); // Redirect to /chat if user is logged in
        }
    }, [user, navigate]);

    return (
        <Content
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '50px 0',
            }}
        >
            <Row justify="center" align="middle" style={{ width: '100%' }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '30px',
                            textAlign: 'center',
                        }}
                    >
                        <Title level={2}>Welcome to Our App</Title>
                        <Paragraph style={{ fontSize: '16px', color: '#888' }}>
                            A modern, simple platform for chatting with your friends and colleagues.
                            Connect, share, and collaborate!
                        </Paragraph>

                        {!user && (
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => navigate('/login')}
                                    block
                                >
                                    Log In
                                </Button>
                                <Button
                                    type="default"
                                    size="large"
                                    onClick={() => navigate('/register')}
                                    block
                                >
                                    Register
                                </Button>
                            </Space>
                        )}

                        {user && (
                            <div>
                                <Title level={3}>You're logged in!</Title>
                                <Paragraph>Redirecting you to the chat page...</Paragraph>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Content>
    );
};

export default Home;
