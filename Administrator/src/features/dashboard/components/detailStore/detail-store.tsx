import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Card } from 'antd';

import StoreApi from '../../../../api/store-api';
import { Loading } from '../../../../components';

import './detail-store.less';

interface IProps {
    storeId: string;
}

interface IStore {
    storeId: string;
    province: string;
    address: string;
    code: string;
    district: string;
    name: string;
    ward: string;
    wardName: string;
    districtName: string;
    provinceName: string;
    fbPageCount: number;
    productCount: number;
    userCount: number;
}

const DetailStore = ({ storeId }: IProps) => {
    const dispatch = useDispatch();

    const [store, setStore] = useState<IStore | null>(null);

    useEffect(() => {
        const requestStore = async () => {
            const res = await StoreApi.loadStore({ storeId });
            setStore(res);
        };

        requestStore();
    }, []);

    const convertAddress = () => {
        if (store) {
            return `${store.address} - ${store.wardName} - ${store.districtName} - ${store.provinceName}`;
        }

        return '';
    };

    if (!store) {
        return <Loading full />;
    }

    return (
        <Row className='detail__store'>
            <Card style={{ width: '100%' }}>
                <Row gutter={24}>
                    <Col span={6}>Tên</Col>
                    <Col span={18}>{store.name}</Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>Địa chỉ</Col>
                    <Col span={18}>{convertAddress()}</Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>Code</Col>
                    <Col span={18}>{store.code}</Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>Số trang FB</Col>
                    <Col span={18}>{store.fbPageCount}</Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>Số lượng Sản phẩm</Col>
                    <Col span={18}>{store.productCount}</Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>Số lượng người dùng</Col>
                    <Col span={18}>{store.userCount}</Col>
                </Row>
            </Card>
        </Row>
    );
};

export default DetailStore;
