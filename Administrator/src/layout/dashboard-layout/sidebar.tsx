import { Layout, Menu, Typography } from 'antd';
import React, { FC } from 'react';
import Media from 'react-media';
import { Link, NavLink } from 'react-router-dom';
import icActionsUser from '../../assets/images/ic-actions-user.svg';
import iconTrigger from '../../assets/images/ic-chevron-left-right.svg';
import iconContactChat from '../../assets/images/ic-contact-chat.svg';
import iconEcommerceHouse from '../../assets/images/ic-ecommerce-house.svg';
import iconProduct from '../../assets/images/ic-layout-left-menu.svg';
import icReport from '../../assets/images/ic-report.svg';
import icStatisticFunnel from '../../assets/images/ic-statistics-funnel.svg';
import icBox from '../../assets/images/ic-box.svg';
import { Logo } from '../../components';
import { useLayoutDasboard } from './context';
import './dashboard-layout.less';

const { Sider } = Layout;

interface TriggerIconProps {
    collapsed: boolean;
}

const TriggerIcon: FC<TriggerIconProps> = ({ collapsed }) => {
    const degRotate = collapsed ? '180deg' : '0deg';
    const style = {
        transform: `rotate(${degRotate})`,
    };
    return <img src={iconTrigger} alt='icon' style={{ ...style }} />;
};

interface Props {}

export interface MenuChildType {
    href: string;
    title: string;
    icon?: string;
    children?: MenuChildType[];
}

export const menus: MenuChildType[] = [
    {
        title: 'Tổng quan',
        href: '/dashboard/overview',
        icon: iconProduct,
    },
    {
        title: 'Cửa hàng',
        href: '/dashboard/shops',
        icon: iconEcommerceHouse,
    },
    {
        title: 'Người dùng',
        icon: icActionsUser,
        href: '/dashboard/users',
    },
    {
        title: 'Billings',
        icon: icBox,
        href: '/dashboard/billings',
    },
    {
        title: 'Facebook',
        href: '/facebook',
        icon: iconContactChat,
        children: [
            {
                title: 'Fanpages',
                href: '/dashboard/fanpage',
            },
        ],
    },
    {
        title: 'Báo cáo',
        href: 'report',
        icon: icReport,
        children: [
            {
                title: 'Báo cáo bán hàng',
                href: '/reports',
            },
            {
                title: 'Báo cáo nhập hàng',
                href: '/reports/warehouse',
            },
            {
                title: 'Báo cáo tài chính',
                href: '/reports/financinal',
            },
            {
                title: 'Báo cáo khách hàng',
                href: '/reports/customer',
            },
        ],
    },
    {
        title: 'Cài đặt',
        href: 'setting',
        icon: icStatisticFunnel,
        children: [],
    },
];

const Sidebar: FC<Props> = () => {
    const { collapsed, toggleCollapsed } = useLayoutDasboard();

    const classNameMenu = collapsed ? 'menu small' : 'menu';

    return (
        <Media query={{ maxWidth: 599 }}>
            {(matches) =>
                matches ? (
                    <Sider collapsed={collapsed} onCollapse={toggleCollapsed} width={0}>
                        <div className='sidebar-logo'>
                            <Logo size={100} />
                        </div>

                        <div className='menus'>
                            {menus.map((menu) => (
                                <NavLink
                                    key={menu.href}
                                    to={menu.href}
                                    href={menu.href}
                                    activeClassName='active'
                                    className={classNameMenu}
                                >
                                    <span
                                        className='nav__icon anticon'
                                        style={{
                                            backgroundImage: `url(${menu.icon})`,
                                        }}
                                    ></span>
                                    <span className='text'>{menu.title}</span>
                                </NavLink>
                            ))}
                        </div>
                    </Sider>
                ) : (
                    <Sider
                        collapsed={collapsed}
                        onCollapse={toggleCollapsed}
                        collapsible
                        width={250}
                        trigger={<TriggerIcon collapsed={collapsed} />}
                        style={{
                            backgroundColor: '#252f47',
                        }}
                    >
                        <div className='sidebar-logo'>
                            <Logo size={150} collapsed={collapsed} />
                        </div>

                        <Menu mode='inline' theme='dark' className='nav__menu'>
                            {menus.map((c: MenuChildType) =>
                                Boolean(c.children) ? (
                                    <Menu.SubMenu
                                        icon={
                                            <span>
                                                <span
                                                    className='nav__icon anticon'
                                                    style={{
                                                        backgroundImage: `url(${c.icon})`,
                                                    }}
                                                ></span>
                                                <span>{c.title}</span>
                                            </span>
                                        }
                                        key={c.href}
                                    >
                                        {c.children?.map((sub) => (
                                            <Menu.Item key={sub.href}>
                                                <Link to={sub.href}>{sub.title}</Link>
                                            </Menu.Item>
                                        ))}
                                    </Menu.SubMenu>
                                ) : (
                                    <Menu.Item key={c.href}>
                                        <Link to={c.href}>
                                            <span
                                                className='nav__icon anticon'
                                                style={{ backgroundImage: `url(${c.icon})` }}
                                            ></span>
                                            <span>{c.title}</span>
                                        </Link>
                                    </Menu.Item>
                                )
                            )}
                        </Menu>
                    </Sider>
                )
            }
        </Media>
    );
};

export default Sidebar;
