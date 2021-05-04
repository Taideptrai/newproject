import React, { FC } from 'react';

import { Row, Col, Form, Input, DatePicker, Select, Card } from 'antd';

import { Gender } from '../../../../constants/gender';

const AdditionalInfo: FC = () => {
    return (
        <Card title="Thông tin bổ sung">
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item label="Ngày sinh" name="dateOfBirth">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Giới tính" name="gender">
                        <Select placeholder="Chọn giới tính">
                            <Select.Option value={Gender.MALE}>Nam</Select.Option>
                            <Select.Option value={Gender.FEMALE}>Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item label="Website">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Mã số thuế">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default AdditionalInfo;
