import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { isNil } from 'lodash';
import React, { FC } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../reducers/authState/authAction';
import { connectFanpageAction } from '../../reducers/fanpageState/fanpageAction';
import './header-right.less';
import rectangle from './images/rectangle-4-copy.png';

interface Props {
    isAuth: boolean;
    user: any;
    pages: any;
    loadingPages: any;
    logout: any;
    connectFanpageAction: any;
    title?: string;
    children?: any | null;
}

const HeaderRight: FC<Props> = ({
    isAuth,
    user = {},
    pages = {},
    loadingPages,
    logout,
    connectFanpageAction,
    title,
    children,
}): JSX.Element => {
    let menu: Array<any> = [];
    const store = useSelector((state: any) => state.store.store);

    if (isAuth) {
        menu.push(
            {
                name: 'Trang quản lý',
                link: '/customer/conversation',
            },
            {
                name: 'Chọn lại trang',
                link: '/customer/select-pages',
            },
            {
                name: 'Đăng xuất',
                link: '/login',
                action: () => logout(),
            }
        );
        if (store.role >= 1) {
            menu = menu.filter((item) => item.link !== '/customer/select-pages');
        }
    } else {
        menu.push({
            name: 'Đăng nhập',
            link: '/login',
        });
    }

    const menuDropdown = (
        <Menu>
            {menu.map((item, key) => (
                <Menu.Item key={key.toString()} onClick={item.action && item.action}>
                    <Link to={item.link}>{item.name}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );

    const handleConnnectFanpage = (response: any = {}) => {
        const { accessToken } = response;
        connectFanpageAction({ shortLiveToken: accessToken });
    };

    return (
        <div className='header-right'>
            {!isNil(title) ? <div className='title'>{title}</div> : children}

            <Dropdown
                overlayClassName='dropdown-active'
                overlay={menuDropdown}
                trigger={['click']}
                placement='bottomRight'
            >
                <div className='user-dropdown'>
                    <span className='name'>{store.name}</span>
                    <img className='icon' src={rectangle} alt='' />
                    <Avatar
                        className='avatar'
                        icon={<UserOutlined />}
                        size={43}
                        src={user.picture}
                    />
                </div>
            </Dropdown>
        </div>
    );
};

const enhance = connect(
    ({ auth, fanpage }: any) => ({
        isAuth: auth.isAuth,
        user: auth.user,
        pages: fanpage.pages,
        loadingPages: fanpage.loading,
    }),
    { logout, connectFanpageAction }
);

export default enhance(HeaderRight);
