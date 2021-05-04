import {DownOutlined} from '@ant-design/icons';
import {Button, Dropdown, Menu} from 'antd';
import React, {FC} from 'react';
import {InsaCard, InsaChart} from '../../../../components';

const Revenue: FC = () => {
    const dataChart = [1, 2, 3];
    const categoriesChart = ['1', '1', '3'];

    const menu = (
        <Menu>
            <Menu.Item key="month">Tháng này</Menu.Item>
        </Menu>
    );

    return (
        <InsaCard
            bordered
            title={<div className="title-card">Biểu đồ doanh thu</div>}
            extra={
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button type="primary">
                        Tháng này <DownOutlined />
                    </Button>
                </Dropdown>
            }
        >
            <InsaChart data={dataChart} categories={categoriesChart} />
        </InsaCard>
    );
};

export {Revenue};
