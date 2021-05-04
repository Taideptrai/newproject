import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Table, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import { updateSort } from '../state/storeSlide';
import Action from './stores/action';

const StoreTable = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.store.loading);
    const stores = useSelector((state: any) => state.store.stores);
    const page = useSelector((state: any) => state.store.page);

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const data = {
            page: pagination.current,
            limit: pagination.pageSize,
            sort: sorter.field,
            direction: sorter.order,
        };

        dispatch(updateSort(data));
    };

    const dataSource = (stores.data || []).map((store: any, index: number) => ({
        ...store,
        index: (page - 1) * 10 + index + 1,
    }));

    const columns: ColumnsType<[]> = [
        { title: 'STT', dataIndex: 'index', key: 'index', align: 'center' },
        {
            title: 'Tên shop',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Chủ shop',
            dataIndex: 'owner',
            align: 'center',
            key: 'owner',
            render: (owner: any) => {
                if (owner) {
                    return (
                        <>
                            <Avatar src={owner.picture} icon={<UserOutlined />} alt={owner.name}>
                                {owner.name}
                            </Avatar>
                            <div style={{ marginTop: 5 }}>{owner.name}</div>
                        </>
                    );
                }

                return <span>"</span>;
            },
        },
        {
            title: 'SĐT',
            dataIndex: 'phoneNo',
            sorter: true,
            key: 'phoneNo',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: true,
            key: 'address',
            render: (address: any, record: any) => {
                return `${address} - ${record.wardName} - ${record.districtName} - ${record.provinceName}`;
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createAt',
            key: 'createAt',
            sorter: true,
            render: (createAt: any) => moment(createAt).format('DD/MM/YYYY'),
        },
        {
            title: 'Chi Tiết',
            key: 'createAt',
            render: (record: any) => <Action record={record} />,
        },
    ];

    return (
        <Table
            bordered
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowKey='_id'
            onChange={handleTableChange}
            pagination={{
                total: stores.total || 0,
                showSizeChanger: false,
            }}
        />
    );
};

export default StoreTable;
