import {Menu} from 'antd';
import React, {FC, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {
    ChartPieFill,
    ChartSquareBarFill,
    CogFill,
    DocumentAddFill,
    HomeFill,
    ShoppingBagFill,
    ShoppingCartFill,
    UserFill,
} from './icon';
import './menus.less';

const {SubMenu} = Menu;

export interface MenuChildType {
    href: string;
    title: string;
    icon?: ReactNode;
    children?: MenuChildType[];
}

const menus: MenuChildType[] = [
    {
        title: 'Tổng quan',
        href: '/dashboard/overview',
        icon: ChartSquareBarFill,
    },
    {
        title: 'Sao chép sản phẩm',
        href: '/dashboard/product-copy',
        icon: DocumentAddFill,
    },
    {
        title: 'Phân tích thị trường',
        href: '/dashboard/analysis',
        icon: ChartPieFill,
    },
    {
        title: 'Đơn hàng',
        href: '/dashboard/order',
        icon: ShoppingCartFill,
    },
    {
        title: 'Khách hàng',
        href: '/dashboard/customer',
        icon: UserFill,
        children: [
            {
                href: '/dashboard/customer/list',
                title: 'Danh sách khách hàng',
            },
            {
                href: '/dashboard/customer/find',
                title: 'Danh sách khách hàng',
            },
        ],
    },
    {
        title: 'Sản phẩm',
        href: '/dashboard/products',
        icon: ShoppingBagFill,
        children: [
            {
                href: '/dashboard/products/list',
                title: 'Danh sách sản phẩm',
            },
            {
                href: '/dashboard/products/add',
                title: 'Thêm sản phẩm',
            },
            {
                href: '/dashboard/customer/boost',
                title: 'Đẩy sản phẩm',
            },
        ],
    },
    {
        title: 'Quản lý shop',
        href: '/dashboard/shops',
        icon: HomeFill,
    },
    {
        title: 'Cài đặt',
        href: '/dashboard/setting',
        icon: CogFill,
    },
];

const Menus: FC = () => {
    return (
        <Menu theme="light" mode="inline" className="dashboard_menu">
            {menus.map((menu: MenuChildType) => {
                if (menu.children) {
                    return (
                        <SubMenu
                            key={menu.href}
                            icon={menu.icon}
                            title={menu.title}
                        >
                            {menu.children.map(item => {
                                return (
                                    <Menu.Item key={item.href}>
                                        <Link to={item.href}>{item.title}</Link>
                                    </Menu.Item>
                                );
                            })}
                        </SubMenu>
                    );
                }
                return (
                    <Menu.Item key={menu.href} icon={menu.icon}>
                        <Link to={menu.href}>{menu.title}</Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

export {Menus};
