import {Row, Col} from 'antd';
import React, {FC} from 'react';
import {OverviewCard} from '../../components';

const OverviewNumber: FC = () => {
    return (
        <Row gutter={16}>
            <Col md={6}>
                <OverviewCard
                    title="Doanh thu tháng này"
                    color="#307dd2"
                    value="150.000.000"
                    valueTitle="VND"
                />
            </Col>
            <Col md={6}>
                <OverviewCard
                    title="Doanh thu hôm nay"
                    color="#23b7e5"
                    value="10.000.000"
                    valueTitle="VND"
                />
            </Col>
            <Col md={6}>
                <OverviewCard
                    title="Đơn hôm nay"
                    color="#ffcd07"
                    value="200"
                    valueTitle="Đơn hàng"
                />
            </Col>
            <Col md={6}>
                <OverviewCard
                    title="Đơn chờ xử lý"
                    color="#f05050"
                    value="20"
                    valueTitle="Đơn hàng"
                />
            </Col>
        </Row>
    );
};

export {OverviewNumber};
