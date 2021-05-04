import React from 'react';
import { Row, Col } from 'antd';

import browser from './images/ic-contact-browser.svg';
import edit from './images/ic-actions-emultiple-edit.svg';
import shipIcon from './images/ic-ecommerce-delivery.svg';
import wallet from './images/wallet.svg';
import integration from './images/integration.svg';

interface Props {}

const integrations = [
    {
        title: 'Thiết kế website',
        text:
            'Giao diện website tùy biến thông minh Nhiều công cụ marketing mạnh mẽ Kết nối tồn kho trực tiếp Tích hợp tính phí vận chuyển Tích hợp các cổng thanh toán online',
        icon: browser,
    },

    {
        title: 'Quản lý bán hàng',
        text:
            'Đồng bộ mọi hoạt động bán hàng. Bán hàng trên Shopee, Lazada, Adayroi. Kết nối trực tiếp kho hàng và website. Tùy biến chiết khấu, tích điểm, coupon Kiểm kho nhanh chóng, tránh thất thoát',
        icon: edit,
    },
    {
        title: 'Dịch vụ vận chuyển',
        text:
            'Xử lý hàng nghìn đơn hàng trong ngày. Kết nối với nhiều hãng vận chuyển. Kiểm tra lịch trình dễ dàng. Đối soát hàng nghìn đơn trong tích tắc. Nhận tiền hàng các ngày trong tuần',
        icon: shipIcon,
    },
    {
        title: 'Thanh toán VNPay QR qua chat',
        text:
            'Chọn hình thức thanh toán VNPay QR, phần mềm quản lý bán hàng sẽ tự động gửi tin nhắn chứa mã QR của cần thanh toán. Người mua chỉ cần quét mã là đã có thể thanh toá',
        icon: wallet,
    },
];

const Integration = (props: Props) => {
    return (
        <div className='home-section home-integration'>
            <div className='container'>
                <div className='home-title text-center'>
                    <h4>Hệ thống phần mềm tích hợp với</h4>
                </div>

                <Row gutter={40} align='middle'>
                    <Col lg={12}>
                        <Row gutter={20}>
                            {integrations.map((integration: any) => {
                                return (
                                    <Col md={12} key={integration.title}>
                                        <div className='integration-item'>
                                            <div className='icon'>
                                                <img
                                                    src={integration.icon}
                                                    alt={integration.title}
                                                />
                                            </div>
                                            <h5>{integration.title}</h5>
                                            <p>{integration.text}</p>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                    <Col lg={12}>
                        <div className='img'>
                            <img src={integration} alt='Hệ thống phần mềm tích hợp' />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Integration;
