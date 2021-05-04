import React from 'react';
import { get } from 'lodash';
import { useRouteMatch, Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tabs, Space } from 'antd';
import { BaseLayout } from '../../../layout';
import { DetailStore, OrdersTable } from '../components/detailStore';

const { TabPane } = Tabs;

const Stores = () => {
    const match = useRouteMatch();
    const storeId = get(match, 'params.id');

    function callback() {}

    return (
        <BaseLayout title='Shops'>
            <Tabs
                defaultActiveKey='1'
                onChange={callback}
                tabBarExtraContent={
                    <Link to='/dashboard/shops'>
                        <Button icon={<ArrowLeftOutlined />} style={{ marginRight: 10 }} />
                        Quay lại
                    </Link>
                }
                tabBarStyle={{ padding: '0 15px', background: '#fff' }}
            >
                <TabPane tab='Chi tiết cửa hàng' key='1'>
                    <DetailStore storeId={storeId} />
                </TabPane>
            </Tabs>

            <Tabs
                defaultActiveKey='1'
                onChange={callback}
                tabBarStyle={{ marginTop: '15px', padding: '0 15px', background: '#fff' }}
            >
                <TabPane tab='Đơn hàng' key='1'>
                    <OrdersTable storeId={storeId} />
                </TabPane>
            </Tabs>
        </BaseLayout>
    );
};

export default Stores;
