import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Table, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import { updateSort } from '../state/fanpageSlide';

// const LIMIT = 10;

const columns: ColumnsType<[]> = [
    { title: 'STT', dataIndex: 'index', key: 'index', align: 'center' },
    {
        title: 'Avatar',
        dataIndex: 'picture',
        align: 'center',
        key: 'picture',
        sorter: true,
        render: (picture) => (
            <Avatar src={picture} icon={<UserOutlined />} alt={picture}>
                {picture}
            </Avatar>
        ),
    },
    {
        title: 'Tên Fanpage',
        dataIndex: 'name',
        align: 'center',
        key: 'name',
        sorter: true,
        render: (name) => <div style={{ marginTop: 5 }}>{name}</div>,
    },
    {
        title: 'ID Store',
        dataIndex: 'storeId',
        key: 'storeId',
        sorter: true,
    },
    {
        title: 'Hoạt động',
        dataIndex: 'active',
        sorter: true,
        key: 'active',
        render: (active: any) => {
            return (
                <div style={{ marginTop: 5, color: active ? '#f0564a' : '#c2c5cb' }}>
                    {active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </div>
            );
        },
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: true,
        render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
    },
];

const FanpageTable = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.fanpage.loading);
    const pages = useSelector((state: any) => state.fanpage.fanpage.pages);
    const total = useSelector((state: any) => state.fanpage.fanpage.total);
    const page = useSelector((state: any) => state.fanpage.page);

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

    const dataSource = (pages || []).map((store: any, index: number) => ({
        ...store,
        index: (page - 1) * 10 + index + 1,
    }));

    const onChangePage = (page: number, pageSize?: number | undefined) => {
        handleTableChange({ current: page, pageSize }, {}, {});
    };

    return (
        <Table
            bordered
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowKey='_id'
            onChange={handleTableChange}
            pagination={{
                onChange: onChangePage,
                total,
                showSizeChanger: false,
            }}
        />
    );
};

export default FanpageTable;
