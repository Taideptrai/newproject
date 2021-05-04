import React from 'react';
import { Modal, Row, Col, Card } from 'antd';
import moment from 'moment';
import ShipStatus from './ship-status';

import formatMoney from '../../../../utils/format-money';

interface IProps {
    record: any;
    visible: boolean;
    onCancel: any;
}

const ModalOrder = ({ record, visible, onCancel }: IProps) => {
    if (!record) {
        return null;
    }

    const {
        createdAt,
        customer,
        createdBy,
        products,
        totalPrice,
        status,
        deliveryOptions = {},
    } = record;
    const { serviceId, shipmentFee, shipmentFeeForCustomer } = deliveryOptions;

    const getValue = (products: any, type: 'weight' | 'price') => {
        if (type === 'weight') {
            return products.reduce(
                (value: number, p: any) => p.productId.weight * p.count + value,
                0
            );
        }

        return products.reduce((value: number, p: any) => p.productId.price * p.count + value, 0);
    };

    return (
        <Modal
            className={'detail__order'}
            title={`Chi tiết Đơn hàng`}
            visible={visible}
            onCancel={onCancel}
        >
            <Row>
                <Card style={{ width: '100%' }}>
                    <Row gutter={24}>
                        <Col span={6}>Ngày</Col>
                        <Col span={18}>
                            <>
                                {moment(createdAt).format('HH:mm')}{' '}
                                {moment(createdAt).format('DD/MM/YYYY')}
                            </>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>Khách hàng</Col>
                        <Col span={18}>
                            <>
                                {customer.name} {customer.phoneNo}
                            </>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>Người tạo</Col>
                        <Col span={18}>{createdBy.name}</Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>KL(g)</Col>
                        <Col span={18}>{getValue(products, 'weight')}</Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>Tổng tiền(VND)</Col>
                        <Col span={18}>{formatMoney(totalPrice)}</Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>Trạng thái</Col>
                        <Col span={18}>{status}</Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>Vận chuyển</Col>
                        <Col span={18}>
                            <ShipStatus ship={serviceId} />
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>Chênh lệch PVC(VND)</Col>
                        <Col span={18}>
                            <ShipStatus ship={serviceId} />
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Modal>
    );
};

export default ModalOrder;
