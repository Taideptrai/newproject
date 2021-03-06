import {
    FormOutlined,
    GiftOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Divider, Row, Space } from 'antd';
import { get, pick } from 'lodash';
import React, { FC } from 'react';
import { ItemRow } from '../../../../components';
import formatMoney from '../../../../utils/formatMoney';
import { useOrders } from '../../pages/order/state';
import { getShipmentFeeForCustomer, getValueDiscount } from '../../ultils/order';
import ProductOrder from '../products-select/product-order';
import { Cirle, NoOrder, OrderPrint, OrderStatus } from './components';
import './order.less';

interface Props {}

const colsLayout = {
    colLabel: 12,
    colChildren: 11,
};

const Order: FC<Props> = () => {
    const { order } = useOrders();

    const valueDiscount = getValueDiscount({
        products: get(order, 'products', []),
        discount: get(order, 'deliveryOptions.discount', 0),
        discountBy: get(order, 'deliveryOptions.discountBy', 0),
    });

    const valueOrder = get(order, 'totalPrice', 0) - valueDiscount;

    const shipmentFee = getShipmentFeeForCustomer({
        shipmentFeeForCustomer: get(order, 'deliveryOptions.shipmentFeeForCustomer', 0),
        shipmentFee: get(order, 'deliveryOptions.shipmentFee', 0),
    });

    const valuePayment = valueOrder + shipmentFee;

    const renderContent = () => {
        if (!order) return <NoOrder />;

        return (
            <>
                <Space size={15} direction='vertical' style={{ width: '100%' }}>
                    <Row justify='space-between' align='middle'>
                        <Col>
                            <Space>
                                <span className='order-code'>{order.code}</span>{' '}
                                <OrderStatus status={order.status} />
                            </Space>
                        </Col>
                        <Col>
                            <OrderPrint />
                        </Col>
                    </Row>
                    <div>
                        <div className='title-card-underline' style={{ marginBottom: 15 }}>
                            <span>Th??ng tin ????n h??ng</span>
                        </div>
                        <div>
                            <Row gutter={20}>
                                <Col span={12}>
                                    <ItemRow
                                        icon={
                                            <Cirle>
                                                <UserOutlined />
                                            </Cirle>
                                        }
                                        label='T??n kh??ch h??ng'
                                        {...colsLayout}
                                    >
                                        {order.customer.name}
                                    </ItemRow>
                                    <ItemRow
                                        label='S??? ??i???n tho???i'
                                        icon={
                                            <Cirle>
                                                <PhoneOutlined />
                                            </Cirle>
                                        }
                                        {...colsLayout}
                                    >
                                        {order.customer.phoneNo}
                                    </ItemRow>
                                </Col>
                                <Col span={12}>
                                    {/* <ItemRow
                                        icon={
                                            <Cirle>
                                                <GiftOutlined />
                                            </Cirle>
                                        }
                                        label='Khuy???n m??i'
                                        {...colsLayout}
                                    >
                                        ---
                                    </ItemRow> */}
                                    <ItemRow
                                        icon={
                                            <Cirle>
                                                <FormOutlined />
                                            </Cirle>
                                        }
                                        label='Ghi ch??'
                                        {...colsLayout}
                                    >
                                        {get(order, 'deliveryOptions.customerNote') || '---'}
                                    </ItemRow>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div>
                        <div className='title-card-underline' style={{ marginBottom: 15 }}>
                            <span>Th??ng tin s???n ph???m</span>
                        </div>

                        <div style={{ marginLeft: -24, marginRight: -24 }}>
                            <ProductOrder
                                products={order.products.map((product: any) => ({
                                    ...product.productId,
                                    ...pick(product, ['count', 'price']),
                                }))}
                                isEdit={false}
                                style={{ marginBottom: 30 }}
                            />
                        </div>

                        <div style={{ float: 'right', width: 300 }}>
                            <ItemRow label='T???ng s??? s???n ph???m' colLabel={12} colChildren={11}>
                                {order.products.length}
                            </ItemRow>
                            <ItemRow label='T???ng gi?? tr???' colLabel={12} colChildren={11}>
                                {formatMoney(order.totalPrice)} ??
                            </ItemRow>
                            {/* <ItemRow label='Khuy???n m??i' colLabel={12} colChildren={11}>
                                ---
                            </ItemRow> */}
                            <ItemRow label='Ph?? kh??c' colLabel={12} colChildren={11}>
                                ---
                            </ItemRow>
                            {get(order, 'deliveryOptions.shipmentFee') > 0 && (
                                <ItemRow label='Ph?? v???n chuy???n' colLabel={12} colChildren={11}>
                                    {formatMoney(order.deliveryOptions?.shipmentFee || 0)} ??
                                </ItemRow>
                            )}
                            <ItemRow label='T???ng ti???n ph???i tr???' colLabel={12} colChildren={11}>
                                {formatMoney(valuePayment)} ??
                            </ItemRow>
                            <Divider style={{ margin: '5px 0' }} />
                            <ItemRow label='S??? ti???n ???? thanh to??n' colLabel={12} colChildren={11}>
                                {formatMoney(valuePayment)} ??
                            </ItemRow>
                        </div>
                    </div>
                </Space>
            </>
        );
    };

    return (
        <Card bodyStyle={{ padding: 0 }} className='card-shadow'>
            <div className='order-detail'>{renderContent()}</div>
        </Card>
    );
};

export default Order;
