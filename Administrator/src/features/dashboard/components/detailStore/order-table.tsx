import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { get } from 'lodash';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import formatMoney from '../../../../utils/format-money';
import ShipStatus from './ship-status';
import { loadOrders, updateSort } from '../../state/ordersSlide';
import ModalOrder from './modal-order';

const LIMIT = 20;

const getValue = (products: any, type: 'weight' | 'price') => {
    if (type === 'weight') {
        return products.reduce((value: number, p: any) =>  get(p, 'productId.weight', 0) * p.count + value, 0);
    }

    return products.reduce((value: number, p: any) => p.productId.price * p.count + value, 0);
};

const columns: ColumnsType<any> | undefined = [
    {
        title: <span className='th'>Ngày</span>,
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: Date) => (
            <>
                {moment(createdAt).format('HH:mm')}
                <br />
                {moment(createdAt).format('DD/MM/YYYY')}
            </>
        ),
    },
    {
        title: <span className='th'>Khách hàng</span>,
        dataIndex: 'customer',
        key: 'customer',
        render: (customer: any) => {
            return (
                <>
                    {customer.name}
                    <br />
                    {customer.phoneNo}
                </>
            );
        },
    },
    {
        title: <span className='th'>Người tạo</span>,
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (createdBy: any) => {
            if (!createdBy) return null;

            return <>{createdBy.name}</>;
        },
    },
    {
        title: <span className='th'>KL(g)</span>,
        dataIndex: 'products',
        key: 'weight',

        render: (products: any) => getValue(products, 'weight'),
    },
    {
        title: <span className='th'>Tổng tiền(VND)</span>,
        dataIndex: 'totalPrice',
        key: 'price',
        render: (totalPrice: number) => formatMoney(totalPrice),
    },

    {
        title: <span className='th'>Trạng thái</span>,
        dataIndex: 'status',
        key: 'trang_thai',
        render: (status: any, record: { _id: string }) => {
            return status;
        },
    },

    {
        title: <span className='th'>Vận chuyển</span>,
        dataIndex: 'deliveryOptions',
        key: 'ship',
        render: ({ serviceId }: { serviceId?: number }) => {
            return <ShipStatus ship={serviceId} />;
        },
    },
    {
        title: <span className='th'>Chênh lệch PVC(VND)</span>,
        dataIndex: 'deliveryOptions',

        key: 'xx',
        render: ({
            shipmentFee,
            shipmentFeeForCustomer,
        }: {
            shipmentFee: any;
            shipmentFeeForCustomer: any;
        }) => {
            return formatMoney(shipmentFeeForCustomer - shipmentFee);
        },
    },
];

interface IProps {
    storeId: string;
}

const OrderTable = ({ storeId }: IProps) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(false);

    const order = useSelector(({ order }: { order: any }) => order);
    const { loading, limit, direction, name, sort, page, orders } = order;

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const direction = sorter.order === 'ascend' ? 'asc' : sorter.order;

        const data = {
            page: pagination.current,
            limit: pagination.pageSize,
            sort: sorter.field,
            direction,
        };

        dispatch(updateSort(data));
    };

    useEffect(() => {
        dispatch(loadOrders(storeId));
    }, [page, limit, sort, direction, name]);

    const dataSource = (orders.data || []).map((o: any) => ({ ...o, key: o._id }));

    const onChangePage = (page: number, pageSize?: number | undefined) => {
        handleTableChange({ current: page, pageSize }, {}, {});
    };

    const onCancel = () => {
        setVisible(false);
    };

    return (
        <div className='table-content'>
            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                className='orders-table'
                onRow={(record) => {
                    return {
                        onClick: (event) => {
                            if (
                                (event.target as any).className &&
                                (event.target as any).className === 'ant-table-cell'
                            ) {
                                setVisible(true);
                                setCurrentItem(record);
                            }
                        },
                    };
                }}
                pagination={{
                    onChange: onChangePage,
                    total: orders.total,
                    pageSize: LIMIT,
                }}
                rowKey='_id'
            />

            <ModalOrder record={currentItem} visible={visible} onCancel={onCancel} />
        </div>
    );
};

export default OrderTable;
