import {Space} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import {ColumnsType} from 'antd/lib/table';
import moment from 'moment';
import React, {FC} from 'react';
import {InsaTable} from '../../../../components';

const columns: ColumnsType<any> = [
    {
        title: 'Tên shop',
        dataIndex: 'shop',
        render: (shop: string) => {
            return (
                <Space>
                    <Avatar />
                    <span>{shop}</span>
                </Space>
            );
        },
    },
    {
        title: 'Mã đơn hàng',
        dataIndex: 'orderCode',
        align: 'center',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        align: 'center',
        render: (customer: any) => (
            <>
                <div>{customer.name}</div>
                <div>{customer.phoneNo}</div>
            </>
        ),
    },
    {
        title: 'Tổng tiền',
        align: 'center',
        dataIndex: 'totalMoney',
    },
    {
        title: 'Ngày tạo',
        align: 'center',
        dataIndex: 'date',
        render: date => {
            return (
                <>
                    <div>{moment(date).format('DD/MM/YYYY')}</div>
                    <div>{moment(date).format('HH:mm:ss')}</div>
                </>
            );
        },
    },
    {
        title: 'Trạng thái',
        align: 'center',
        dataIndex: 'status',
    },
];

const dataSource = [
    {
        id: 1,
        shop: 'RainStore',
        orderCode: 'DH401202',
        customer: {
            name: 'Nguyễn Thị Thùy Trang',
            phoneNo: '0905 052 145',
        },
        totalMoney: 250000,
        date: Date.now(),
        status: 'Đã đóng hàng',
    },
    {
        id: 2,
        shop: 'RainStore',
        orderCode: 'DH401202',
        customer: {
            name: 'Nguyễn Thị Thùy Trang',
            phoneNo: '0905 052 145',
        },
        totalMoney: 250000,
        date: Date.now(),
        status: 'Đã đóng hàng',
    },
];

const RecentOrders: FC = () => {
    return (
        <div>
            <InsaTable
                dataSource={dataSource}
                columns={columns}
                rowKey="id"
                pagination={false}
                name="ĐƠN HÀNG GẦN ĐÂY"
            />
        </div>
    );
};

export {RecentOrders};
