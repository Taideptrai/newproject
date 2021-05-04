import React, { FC } from 'react';

import { Gender } from '../../../constants/gender';

import { Row, Col, Card, Space, Typography } from 'antd';
import CustomerInfoAction from './customer-info-action';
import { useCustomer } from './context';
import { guest } from '../../../constants/guest';

import './general-info.less';

interface Props {}

const GeneralInfo: FC<Props> = () => {
    const { customer } = useCustomer();

    const getGenderName = (gender: Gender) => {
        return gender === Gender.MALE ? 'Nam' : 'Nữ';
    };

    return (
        <Card
            title={
                <Space>
                    <Typography.Text>Thông tin khách hàng</Typography.Text>
                    {customer._id !== guest._id && <CustomerInfoAction />}
                </Space>
            }
            className="customer-general-info"
        >
            <Row gutter={[10, 16]}>
                <Col span={8}>
                    <Row>
                        <Col span={10}>
                            <div className="text-bold">Nhóm khách hàng</div>
                        </Col>
                        <Col span={12}>: Khách lẻ</Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={6}>
                            <div className="text-bold">Giới tính</div>
                        </Col>
                        <Col span={12}>
                            : {customer.gender ? getGenderName(customer.gender) : '---'}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={10}>
                            <div className="text-bold">Mã khách hàng</div>
                        </Col>
                        <Col span={12}>: {customer.code}</Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={[10, 0]}>
                <Col span={8}>
                    <Row>
                        <Col span={10}>
                            <div className="text-bold">Số điện thoại</div>
                        </Col>
                        <Col span={12}>: {customer.phoneNo}</Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={6}>
                            <div className="text-bold">Email</div>
                        </Col>
                        <Col span={12}>: {customer.email || '---'}</Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={10}>
                            <div className="text-bold">Ngày sinh</div>
                        </Col>
                        <Col span={12}>: {customer.dateOfBirth || '---'}</Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default GeneralInfo;
