import {Col, Row} from 'antd';
import React, {FC} from 'react';

interface Props {}

const HomeForm: FC<Props> = () => {
    return (
        <div className="home-form">
            <div className="box-form">
                <div className="home-title text-center">
                    <h4>Bắt đầu dùng thử miễn phí 30 ngày</h4>
                    <p>
                        Cùng trải nghiệm phần mềm quản lý và bán hàng đa kênh
                        được 60.000 doanh nghiệp lựa chọn
                    </p>
                </div>

                <form className="form">
                    <Row>
                        <Col md={16} sm={12} xs={12}>
                            <input
                                placeholder="Nhập số điện thoại của bạn"
                                type="text"
                            />
                        </Col>
                        <Col md={8} sm={12} xs={12}>
                            <button
                                className="btn-home btn-primary"
                                type="submit"
                                style={{fontWeight: 700}}
                            >
                                Dùng thử miễn phí
                            </button>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
};

export {HomeForm};
