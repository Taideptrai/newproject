import { CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { Space, Avatar, Dropdown, Menu } from 'antd';
import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/state/auth-slide';
import { LogoutIcon } from '../../assets/icon';
import SettingAccounts from '../../features/settings/account';

const HeaderUser: FC = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.auth.loading);
    const user = useSelector((state: any) => state.auth.user);

    const [visibleSettingAccount, setVisibleSettingAccount] = useState<boolean>(false);

    const toggleModalSettingAccount = () => setVisibleSettingAccount(!visibleSettingAccount);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (loading) return null;

    const overlay = (
        <Menu>
            {/* Show after add feature  */}
            {/* <Menu.Item key={1}>Chú thích phím tắt</Menu.Item> */}
            {/* <Menu.Item key={2}>Hướng dẫn sử dụng</Menu.Item> */}
            <Menu.Item key={3} onClick={toggleModalSettingAccount}>
                Cài đặt tài khoản
            </Menu.Item>
            <Menu.Item key={4} onClick={handleLogout} className='logout'>
                <LogoutIcon /> Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={overlay} trigger={['click']} placement='bottomRight'>
                <Space size={5} style={{ height: 56 }}>
                    <span>{user.name}</span> <CaretDownFilled />{' '}
                    <span className='avatar-user'>
                        <Avatar icon={<UserOutlined />} />
                    </span>
                </Space>
            </Dropdown>

            <SettingAccounts visible={visibleSettingAccount} toggle={toggleModalSettingAccount} />
        </>
    );
};

export default HeaderUser;
