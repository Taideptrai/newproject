import {BellOutlined, CaretDownOutlined, UserOutlined} from '@ant-design/icons';
import {Badge, Dropdown, Menu, Space} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, {FC} from 'react';
import {useAuth} from '../../../../context';

const AuthHeader: FC = () => {
    const {user, isAuth, logout} = useAuth();

    if (!isAuth) {
        return <div />;
    }

    const handleClick = (e: any) => {
        if (e.key === 'logout') {
            logout();
        }
    };

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key="logout">Đăng xuất</Menu.Item>
        </Menu>
    );

    return (
        <Space size={30}>
            <Badge count={5} size="small">
                <BellOutlined />
            </Badge>

            <Dropdown overlay={menu} trigger={['click']}>
                <Space size={7}>
                    <CaretDownOutlined style={{fontSize: 12}} />

                    <span>{user?.name}</span>
                    <Avatar
                        size={40}
                        src={user?.picture}
                        style={{backgroundColor: '#87d068'}}
                        icon={<UserOutlined />}
                    />
                </Space>
            </Dropdown>
        </Space>
    );
};

export {AuthHeader};
