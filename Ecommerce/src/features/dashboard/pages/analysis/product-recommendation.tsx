import {PlusSquareOutlined, SearchOutlined} from '@ant-design/icons';
import {Avatar, Button, Col, Input, List, Row, Space} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import aothun from '../../../../assets/icon/aothun.png';
import exportExcel from '../../../../assets/icon/export-excel.png';
import linkProduct from '../../../../assets/icon/link-product.png';
import shopeeMini from '../../../../assets/icon/shopee-mini.png';
import {BorderButton, InsaCard} from '../../../../components';
import {InsaTablePageSize} from '../../../../components/insa-table';

const columns: ColumnsType<any> = [
    {
        title: 'Sản phẩm',
        dataIndex: 'product',
        width: 470,
        render: (_, record) => {
            return (
                <List.Item.Meta
                    avatar={
                        <Avatar
                            src={record.product.image}
                            style={{width: 48, height: 48}}
                        />
                    }
                    title={<Link to="/">{record.product.name}</Link>}
                    className="product"
                    description={
                        <Space>
                            <PlusSquareOutlined />
                            <span>{record.product.categories} phân loại</span>
                            <img src={shopeeMini} alt="Shopee" width={13} />
                            <span className="shopee">Shopee</span>
                        </Space>
                    }
                />
            );
        },
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
        align: 'center',
        width: 140,
    },
    {
        title: 'Xem',
        dataIndex: 'view',
        align: 'center',
        width: 140,
    },
    {
        title: 'Thích',
        dataIndex: 'like',
        align: 'center',
        width: 140,
    },
    {
        title: 'Đánh giá',
        dataIndex: 'comment',
        align: 'center',
        width: 140,
    },
    {
        title: 'Doanh thu',
        dataIndex: 'revenue',
        align: 'center',
        width: 140,
    },
];

const dataSource = [
    {
        id: 1,
        product: {
            name:
                'Giày Sandal Saado 💖 FREESHIP 💖Sandal Nam/Nữ SC01 - Yezi Black Chili',
            categories: 8,
            image: aothun,
        },
        price: 250000,
        view: 7500,
        like: 800,
        comment: 12,
        revenue: 20000000,
    },
    {
        id: 2,
        product: {
            name:
                'Giày Sandal Saado 💖 FREESHIP 💖Sandal Nam/Nữ SC01 - Yezi Black Chili',
            categories: 8,
            image: aothun,
        },
        price: 250000,
        view: 7500,
        like: 800,
        comment: 12,
        revenue: 20000000,
    },
    {
        id: 3,
        product: {
            name:
                'Giày Sandal Saado 💖 FREESHIP 💖Sandal Nam/Nữ SC01 - Yezi Black Chili',
            categories: 8,
            image: aothun,
        },
        price: 250000,
        view: 7500,
        like: 800,
        comment: 12,
        revenue: 20000000,
    },
    {
        id: 4,
        product: {
            name:
                'Giày Sandal Saado 💖 FREESHIP 💖Sandal Nam/Nữ SC01 - Yezi Black Chili',
            categories: 8,
            image: aothun,
        },
        price: 250000,
        view: 7500,
        like: 800,
        comment: 12,
        revenue: 20000000,
    },
    {
        id: 5,
        product: {
            name:
                'Giày Sandal Saado 💖 FREESHIP 💖Sandal Nam/Nữ SC01 - Yezi Black Chili',
            categories: 8,
            image: aothun,
        },
        price: 250000,
        view: 7500,
        like: 800,
        comment: 12,
        revenue: 20000000,
    },
];

const ProductRecommendation: FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(15);

    const onSelectChange = (rowKeys: any) => {
        setSelectedRowKeys(rowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleTableChange = (pagination: any) => {
        setPage(pagination.current);
    };
    const onChangePageSize = (value: number) => {
        setPageSize(value);
        setPage(1);
    };

    return (
        <InsaCard
            bordered
            title={<div className="title-card">ĐỀ XUẤT SẢN PHẨM</div>}
            className="product-recommendation"
        >
            <Row className="search-box" justify="space-between">
                <Col>
                    <Row gutter={[8, 8]}>
                        <Col>
                            <Input
                                size="large"
                                placeholder="Tìm kiếm sản phẩm"
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                        <Col>
                            <Button size="large" type="primary">
                                Tìm kiếm
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row gutter={[8, 8]}>
                        <Col>
                            <BorderButton size="large">
                                Xuất Excel
                                <img
                                    width={18}
                                    height={18}
                                    src={exportExcel}
                                    alt="Export"
                                    style={{marginLeft: 6}}
                                />
                            </BorderButton>
                        </Col>
                        <Col>
                            <BorderButton size="large">
                                Link sản phẩm
                                <img
                                    width={18}
                                    height={18}
                                    src={linkProduct}
                                    alt="Link"
                                    style={{marginLeft: 6}}
                                />
                            </BorderButton>
                        </Col>
                        <Col>
                            <Button size="large" type="primary">
                                Sao chép sản phẩm
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <InsaTablePageSize
                dataSource={dataSource}
                columns={columns}
                rowKey="id"
                scroll={{x: 1160, y: 315}}
                onChange={handleTableChange}
                rowSelection={rowSelection}
                onChangePageSize={onChangePageSize}
                pagination={{
                    current: page,
                    total: dataSource.length,
                    pageSize,
                }}
            />
        </InsaCard>
    );
};

export {ProductRecommendation};
