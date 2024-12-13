import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Input, Button, Typography, Card, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { errMsgInstance } from '../utils/commonUtils';
import { useMessage } from '../context/MessageContext';

const { Title } = Typography;

const Login: React.FC = () => {
    const { login, user } = useAuth();
    const { showMessage } = useMessage();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/chat'); // Redirect to chat if already logged in
        }
    }, [user, navigate]);

    const handleSubmit = async (values: any) => {
        const { username, password } = values;
        try {
            await login(username, password);
        } catch (error) {
            showMessage(errMsgInstance(error), "error")
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Card
                style={{
                    width: 400,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Title level={2} style={{ textAlign: 'center' }}>
                    Login
                </Title>

                <Form
                    name="login"
                    onFinish={handleSubmit}
                    initialValues={{ username, password }}
                    style={{ maxWidth: '100%' }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={false} // You can add a loading state here if needed
                            >
                                Log In
                            </Button>
                            <Button
                                type="link"
                                onClick={() => navigate('/register')}
                                block
                                size="large"
                            >
                                Don't have an account? Register here
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
