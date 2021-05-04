import React from 'react';
import { Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import { updateSort } from '../state/userSlide';

const columns: ColumnsType<[]> = [
    { title: 'STT', dataIndex: 'index', key: 'index', align: 'center' },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Quyền',
        dataIndex: 'permissions',
        key: 'permissions',
        render: (permissions: any[]) => {
            if (permissions && Array.isArray(permissions)) {
                return (
                    <>
                        {permissions.map((permission) => (
                            <Tag key={permission} color='magenta'>
                                {permission}
                            </Tag>
                        ))}
                    </>
                );
            }
            return <></>;
        },
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: true,
        render: (createAt: any) => moment(createAt).format('DD/MM/YYYY'),
    },
];

const UserTable = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.user.loading);
    const users = useSelector((state: any) => state.user.user.users);
    const total = useSelector((state: any) => state.user.user.total);
    const page = useSelector((state: any) => state.user.page);

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

    const dataSource = (users || []).map((user: any, index: number) => ({
        ...user,
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
                hideOnSinglePage: true,
                showSizeChanger: false,
                current: page,
                pageSize: 10,
            }}
        />
    );
};

export default UserTable;
