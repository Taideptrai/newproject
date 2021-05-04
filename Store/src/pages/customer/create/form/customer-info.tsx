import { Card, Col, Form, Input, Row, Select } from 'antd';
import React, { FC } from 'react';

interface Props {}

const CustomerInfo: FC<Props> = () => {
    return (
        <Card title="Thông tin khách hàng">
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item
                        label="Tên khách hàng"
                        name="name"
                        rules={[{ required: true, message: 'Nhập tên khách hàng' }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Nhóm khách hàng" name="source">
                        <Select placeholder="Chọn nhóm khách hàng" disabled>
                            <Select.Option value="facebook">Facebook</Select.Option>
                            <Select.Option value="pos">Pos</Select.Option>
                            <Select.Option value="shopee">Shopee</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[10, 0]}>
                {/* <Col span={12}>
                    <Form.Item
                        label="Mã khách hàng"
                        name="code"
                        rules={[{ required: true, message: 'Nhập mã khách hàng' }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                </Col> */}
                <Col span={12}>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNo"
                        rules={[
                            { required: true, message: 'Nhập số điện thoại' },
                            {
                                pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                                message: 'Số điện thoại không đúng',
                            },
                        ]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default CustomerInfo;
