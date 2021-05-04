import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';

interface Props {}

const FormSubscride = (props: Props) => {
    return (
        <div className='form-subscride'>
            <div className='box-form'>
                <div className='home-title text-center'>
                    <h4>Bắt đầu dùng thử miễn phí 30 ngày</h4>
                    <p>
                        Cùng trải nghiệm phần mềm quản lý và bán hàng đa kênh được 60.000 doanh
                        nghiệp lựa chọn
                    </p>
                </div>

                <Form className='form'>
                    <Row gutter={15}>
                        <Col md={16} sm={24} xs={24}>
                            <Input
                                style={{ height: 48 }}
                                size='large'
                                type='text'
                                placeholder='Nhập tên cửa hàng, doanh nghiệp của bạn'
                            />
                        </Col>
                        <Col md={8} sm={24} xs={24}>
                            <Button
                                block
                                type='primary'
                                htmlType='submit'
                                style={{ height: 48 }}
                                size='large'
                            >
                                Dùng thử miễn phí
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default FormSubscride;
