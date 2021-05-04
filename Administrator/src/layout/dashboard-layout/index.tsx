import { Layout } from 'antd';
import React, { FC, ReactNode } from 'react';
import { ProviderLayout } from './context';
import './dashboard-layout.less';
import Header from './header';
import Sidebar from './sidebar';

interface Props {
    children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
    return (
        <ProviderLayout>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />

                <Layout className='content'>
                    <Header />

                    <div>{children}</div>
                </Layout>
            </Layout>
        </ProviderLayout>
    );
};

export default DashboardLayout;
