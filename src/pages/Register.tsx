import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Input, Button, Typography, notification, Card } from 'antd';
import { useMessage } from '../context/MessageContext';
import { errMsgInstance } from '../utils/commonUtils';

const { Title } = Typography;

const Register: React.FC = () => {
    const { register } = useAuth();
    const { showMessage } = useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            await register(values.username, values.password);
            navigate('/chat'); // Redirect to chat page after successful registration
        } catch (error) {
            showMessage(errMsgInstance(error), "error")
        } finally {
            setLoading(false);
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
                <Title level={2}>Register</Title>
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="User Name"
                        name="username"
                        rules={[{ required: true, message: 'Please input user name' }]}
                    >
                        <Input
                            type="text"
                            placeholder="Enter username"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirm_password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter confirm password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            Register
                        </Button>
                        <Button
                            type="link"
                            onClick={() => navigate('/login')}
                            block
                            size="large"
                        >
                            Do you have a account? Login here
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
