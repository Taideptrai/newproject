import React from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import { updateSort } from '../state/billingSlide';
import Action from './billings/action';
import { AliasPackage, ColorPackage, EBillingPackageType } from '../../../constants';
import { IStore, IBilling } from '../../../models/billing';
import formatMoney from '../../../utils/format-money';

const BillingTable = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.billing.loading);
    const billings = useSelector((state: any) => state.billing.billings);
    const page = useSelector((state: any) => state.billing.page);
    const limit = useSelector((state: any) => state.billing.limit);

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const data = {
            page: pagination.current,
            limit: pagination.pageSize,
            sort: sorter.field,
            direction: !sorter.order ? '' : sorter.order === 'ascend' ? 'asc' : 'desc',
        };

        dispatch(updateSort(data));
    };

    const dataSource = (billings.data || []).map((billing: IBilling, index: number) => ({
        ...billing,
        index: (page - 1) * 10 + index + 1,
    }));

    const columns: ColumnsType<[]> = [
        { title: 'STT', dataIndex: 'index', key: 'index', align: 'center' },
        {
            title: 'Tên cửa hàng',
            dataIndex: 'storeId',
            align: 'center',
            key: 'storeId',
            render: (storeId: IStore) =>
                <Link to={`/dashboard/shops/${storeId._id}`} target='_blank'>
                    {storeId.name}
                </Link>,
        },
        {
            title: 'Gói dịch vụ',
            dataIndex: 'packageType',
            key: 'packageType',
            render: (packageType: number) => {
                const listName = [];
                if (packageType & EBillingPackageType.Trial) {
                    listName.push(AliasPackage[EBillingPackageType.Trial]);
                }
                if (packageType === EBillingPackageType.Omni) {
                    listName.push(`<span style="color: ${ColorPackage[EBillingPackageType.Omni]}">${AliasPackage[EBillingPackageType.Omni]}</span>`);
                }
                if (packageType & EBillingPackageType.Pos) {
                    listName.push(`<span style="color: ${ColorPackage[EBillingPackageType.Pos]}">${AliasPackage[EBillingPackageType.Pos]}</span>`);
                }
                if (packageType & EBillingPackageType.Facebook) {
                    listName.push(`<span style="color: ${ColorPackage[EBillingPackageType.Facebook]}">${AliasPackage[EBillingPackageType.Facebook]}</span>`);
                }
                if (packageType & EBillingPackageType.Shopee) {
                    listName.push(`<span style="color: ${ColorPackage[EBillingPackageType.Shopee]}">${AliasPackage[EBillingPackageType.Shopee]}</span>`);
                }
                return <span dangerouslySetInnerHTML={{ __html: listName.join(', ') }}></span>;
            },
        },
        {
            title: 'Tổng tiền',
            align: 'center',
            dataIndex: 'total',
            key: 'total',
            render: (total: number) => formatMoney(total),
        },
        {
            title: 'Mã đơn hàng',
            align: 'center',
            dataIndex: 'transactionCode',
            key: 'transactionCode',
        },
        {
            title: 'Thời hạn (tháng)',
            align: 'center',
            dataIndex: 'period',
            key: 'period',
        },
        {
            title: 'Ngày đăng ký',
            align: 'center',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // sorter: true,
            render: (createdAt: string) => moment(createdAt).format('DD/MM/YYYY'),
        },
        {
            title: 'Thao tác',
            align: 'center',
            key: '_id',
            render: (record: IBilling) => <Action billingId={record._id} />,
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
                total: billings.total || 0,
                showSizeChanger: false,
                pageSize: limit,
                current: page,
            }}
        />
    );
};

export default BillingTable;
