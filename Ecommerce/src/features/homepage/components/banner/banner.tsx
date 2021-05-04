import {Col, Row} from 'antd';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import banner from '../../assets/images/bg-banner.svg';

const Banner: FC = () => {
    return (
        <div className="banner">
            <div className="container">
                <Row>
                    <Col md={10}>
                        <h2>Phần mềm quản lý bán hàng trên Shopee</h2>
                        <p>
                            Quản lý bán hàng trên các sàn thương mại điện tử
                            Shopee
                        </p>
                        <Link to="/signup">
                            <button className="btn-home" type="button">
                                Dùng thử miễn phí
                            </button>
                        </Link>
                    </Col>
                    <Col md={14}>
                        <div className="img">
                            <img
                                src={banner}
                                alt="Phần mềm quản lý bán hàng trên Shopee"
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export {Banner};
