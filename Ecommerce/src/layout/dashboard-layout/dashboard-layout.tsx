import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';
import React, {FC, ReactNode, useState, useEffect} from 'react';
import Helmet from 'react-helmet';
import {useRouteMatch} from 'react-router-dom';
import {ChevronDoubleLeft, ChevronDoubleRight} from '../../assets/icon';
import {HeaderDasboard, Menus} from './components';
import './dashboard-layout.less';
import {ProviderLayoutDashboard} from './state/context';

const {Sider} = Layout;

const title = 'Dashboard';

interface Props {
    children: ReactNode;
}

const DashboardLayout: FC<Props> = ({children}) => {
    const match = useRouteMatch();
    const [collapsed, setCollapsed] = useState(false);

    const toglge = (): void => setCollapsed(!collapsed);

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {};
    }, [match.path]);

    return (
        <ProviderLayoutDashboard>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <Layout style={{minHeight: '100vh'}}>
                <HeaderDasboard />
                <Content>
                    <Layout
                        style={{
                            minHeight: 'calc(100vh - 60px)',
                        }}
                    >
                        <Sider
                            width={250}
                            className="dashboard_sidebar"
                            collapsible
                            collapsed={collapsed}
                            onCollapse={toglge}
                            theme="light"
                            trigger={
                                collapsed ? (
                                    <ChevronDoubleRight />
                                ) : (
                                    <ChevronDoubleLeft />
                                )
                            }
                        >
                            <Menus />
                        </Sider>
                        <div
                            style={{
                                minHeight: 360,
                                width: 'calc(100% - 250px)',
                            }}
                        >
                            {children}
                        </div>
                    </Layout>
                </Content>
            </Layout>
        </ProviderLayoutDashboard>
    );
};

export {DashboardLayout};
