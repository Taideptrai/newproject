import React, { useState, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { IState } from '../../../store/rootReducer';
import { IOrder, ICustomer, EPaymentType, EPaymentTypeName, ORDER_STATUS } from '../../../models';
import formatMoney from '../../../helper/format-money';
import { compact, get, pick } from 'lodash';
import { storeAction } from '../../../reducers/storeState/action';
import { ICustomerDetailParams } from './index';

import { Col, Row } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { DefaultLayout } from '../../../layout';
import { InsaTable } from '../../../components';
import OrderLabelStatus from '../../order/components/order-label-status';
import { getMoneyProduct, getShipmentFeeForCustomer, getValueDiscount } from '../../order/create/ultil';

import './style.less';

const LIMIT = 20;

const OrderHistory: FC = () => {
    const orders = useSelector((state: IState) => state.store.order);
    const storeObj = useSelector((state: IState) => state.store.data);

    const [page, setPage] = useState<number>(1);

    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams<ICustomerDetailParams>();

    useEffect(() => {
        if (storeObj._id)
            dispatch(
                storeAction.getOrders({
                    id: storeObj._id,
                    customerId: params.customerId,
                    page: page,
                    limit: LIMIT,
                })
            );
        // eslint-disable-next-line
    }, [storeObj._id, page]);

    const columns: ColumnType<any>[] = [
        {
            title: 'Mã đơn hàng',
            align: 'center',
            render: (order: IOrder) =>
                <Link to={`/orders/order/${order._id}`} target="_blank">{order.code}</Link>,
        },
        {
            title: 'Trạng thái',
            align: 'center',
            dataIndex: 'status',
            key: 'status',
            render: (status: ORDER_STATUS) => <span><OrderLabelStatus status={status} /></span>,
        },
        {
            title: 'Tên khách hàng',
            align: 'center',
            key: 'customer_name',
            dataIndex: ['customer', 'name'],
        },
        {
            title: 'Số điện thoại',
            align: 'center',
            key: 'customer_phoneNo',
            dataIndex: ['customer', 'phoneNo'],
        },
        {
            title: 'Địa chỉ',
            align: 'center',
            key: 'customer_address',
            dataIndex: ['customer', 'address'],
            render: (text: string, record: IOrder) => <div>{getCustomerAddress(record)}</div>,
        },
        {
            title: 'Hình thức thanh toán',
            align: 'center',
            key: 'paymentType',
            dataIndex: 'paymentType',
            render: (paymentType: EPaymentType) => <span>{EPaymentTypeName[paymentType]}</span>,
        },
        {
            title: 'Tổng tiền',
            align: 'center',
            render: (order: IOrder) => {
                const products = order.products.map((product: any) => ({
                    ...product.productId,
                    ...pick(product, ['count', 'price']),
                }));

                const productPrice = getMoneyProduct(products);
            
                const discountValue = getValueDiscount({
                    products,
                    discount: order.deliveryOptions.discount,
                    discountBy: order.deliveryOptions.discountBy,
                });
            
                const shipmentFeeForCustomer = get(order, 'deliveryOptions.shipmentFeeForCustomer', 0);
                const shipmentFee = get(order, 'deliveryOptions.shipmentFee', 0);

                const totalPrice = productPrice + getShipmentFeeForCustomer({ shipmentFeeForCustomer, shipmentFee }) - discountValue;

                return <span>{formatMoney(Math.ceil(totalPrice))}</span>;
            },
        },
    ];

    const getCustomerAddress = (order: IOrder) => {
        let { district, districtName, wardName, provinceName } = order.customer as ICustomer;

        let streetName = district && districtName ? district + ' ' + districtName : undefined;

        return compact([streetName, wardName, provinceName]).join(', ');
    };

    const onChangPagination = (page: number) => {
        setPage(page);
    };

    return (
        <DefaultLayout title="Customer">
            <Row>
                <Col span={24}>
                    <InsaTable
                        loading={false}
                        columns={columns}
                        dataSource={orders.data}
                        isShowTotal
                        bordered
                        rowKey="_id"
                        pagination={{
                            pageSize: LIMIT,
                            current: page,
                            total: orders.pagination.total,
                            onChange: onChangPagination,
                            showSizeChanger: false,
                        }}
                        name=""
                        className="order-tbl"
                        hasDefaultColumn={false}
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default OrderHistory;
