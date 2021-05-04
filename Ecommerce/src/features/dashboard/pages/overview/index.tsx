import {DownOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {Button, Dropdown, Menu, Row, Col, Space} from 'antd';
import React, {FC} from 'react';
import Helmet from 'react-helmet';
import {PageTop} from '../../../../layout/dashboard-layout/components';
import {OverviewNumber} from './overview-numbers';
import {RecentOrders} from './recent-orders';
import {Revenue} from './revenue';

const title = 'Tổng quan';

const Overview: FC = () => {
    function handleMenuClick(e: any) {
        console.log('click', e);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">1st menu item</Menu.Item>
            <Menu.Item key="2">2nd menu item</Menu.Item>
            <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
    );

    const rightContent = (
        <Space>
            <Dropdown overlay={menu}>
                <Button type="primary">
                    Tất cả shop <DownOutlined />
                </Button>
            </Dropdown>

            <Button icon={<QuestionCircleOutlined />}>Trợ giúp</Button>
        </Space>
    );
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <PageTop title={title} rightContent={rightContent} />
            <div className="dashboard_content">
                <Row gutter={[0, 24]}>
                    <Col md={24}>
                        <OverviewNumber />
                    </Col>
                    <Col md={24}>
                        <RecentOrders />
                    </Col>

                    <Col md={24}>
                        <Revenue />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Overview;
