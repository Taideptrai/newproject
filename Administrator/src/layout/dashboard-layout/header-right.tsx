import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/state/authSlide';

interface Props {}

const HeaderRight = (props: Props) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const menu = (
        <Menu>
            <Menu.Item key='3' onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <a className='ant-dropdown-link header-right' onClick={(e) => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} /> <DownOutlined />
            </a>
        </Dropdown>
    );
};

export default HeaderRight;
