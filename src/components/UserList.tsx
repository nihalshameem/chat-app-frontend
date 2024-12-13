import React, { useEffect, useId, useRef, useState } from 'react';

import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Typography, Avatar, Space, Badge, Flex, MenuProps } from 'antd';

import { apiUri } from '../utils/envConfigs';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import { errMsgInstance, UserEntity } from '../utils/commonUtils';

const { Title } = Typography;

interface Props {
    activeUser: string | null;
    selecter: (k: string) => void;
}

const UserList: React.FC<Props> = ({ activeUser, selecter }) => {
    const { user, onlineUsers } = useAuth(); // Assuming you have user and users in context

    const { showLoadingMessage, closeLoadingMessage, destroyMessage } = useMessage();
    const [users, setUsers] = useState<UserEntity[]>([])
    const id = useId()
    const initialLoad = useRef<boolean>(true)

    useEffect(() => {
        if (initialLoad.current) {
            initialLoad.current = false
            showLoadingMessage(id, "Fetching users list...")
            axios.post(`${apiUri}user/all-users`, null, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }).then((res) => {
                if (res.data.status === "success") {
                    setUsers(res.data.data.map((item: UserEntity) => ({ ...item, status: onlineUsers.includes(item.username) ? "online" : "offline" })))
                    destroyMessage(id)
                } else {
                    closeLoadingMessage(id, res.data.message)
                }
            }).catch((e) => {
                closeLoadingMessage(id, errMsgInstance(e))
            })
        }
    }, [])

    useEffect(() => {
        setUsers(users.map((item) => ({ ...item, status: onlineUsers.includes(item.username) ? "online" : "offline" })))
    }, [onlineUsers])

    const menuItems: MenuProps["items"] = users.map((obj, i) => {
        return {
            key: i,
            label: (<Flex justify='space-between'>
                <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <span>{obj.username}</span>
                </Space>
                {/* Show online/offline status using Badge */}
                <Badge
                    status={obj.status === "online" ? 'success' : 'default'}
                    style={{ marginLeft: '10px' }}
                />
            </Flex>),
            onClick: () => selecter(obj.username)
        }
    })

    return (
        <>
            <Title level={3} style={{ textAlign: 'center' }}>Users</Title>
            <div className='sidemenu-menus-block'>
                <Menu
                    mode="inline"
                    selectedKeys={[activeUser && users.length > 0 ? users.findIndex(obj => (obj.username === activeUser)).toString() : '']}
                    items={menuItems}
                />
            </div>
        </>
    );
};

export default UserList;
