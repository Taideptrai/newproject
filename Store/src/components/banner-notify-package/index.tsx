import { Button, Col, Row, Space, Typography } from 'antd';
import React, { FC } from 'react';
import { InsaButton } from '..';
import './banner-notify-package.less';
import icActionsCloseSimple from '../../assets/images/ic-actions-close-simple.svg';
import imageForBuy from '../../assets/images/image-for-buy.svg';

const { Title } = Typography;

interface Props {
    packageName?: string;
    closeWarning?: Function;
    forTrial?: boolean;
    onAction?: Function;
}

const BannerNotifyPackage: FC<Props> = ({ packageName, closeWarning, forTrial, onAction }) => {
    return (
        <Row className="banner-notify-package" align="middle" justify="center">
            {forTrial ? (
                <>
                    <Col>
                        <Title level={4} className="notify-content">
                            Gói dịch vụ của bạn đã hết hạn. Vui lòng mua gói dịch vụ để tiếp
                            tục sử dụng
                        </Title>
                    </Col>
                    <Col span={1} />
                    <Col>
                        <InsaButton
                            icon={null}
                            type="default"
                            onClick={() => onAction && onAction()}
                        >
                            Xem các gói
                        </InsaButton>
                    </Col>
                    <Button
                        type="text"
                        className="btn-close"
                        onClick={() => closeWarning && closeWarning()}
                    >
                        <img src={icActionsCloseSimple} alt="icon" />
                    </Button>
                </>
            ) : (
                <>
                    <Col>
                        <img src={imageForBuy} alt="icon" />
                    </Col>
                    <Col span={1} />
                    <Col>
                        <Space>
                            <Title level={4}>Gói dịch vụ</Title>
                            <Title level={3}>{packageName}</Title>
                            <Title level={4}>của bạn sắp hết hạn</Title>
                        </Space>
                    </Col>
                    <Col span={1} />
                    <Col>
                        <InsaButton
                            icon={null}
                            type="default"
                            onClick={() => onAction && onAction()}
                        >
                            Thay đổi gói dịch vụ
                        </InsaButton>
                    </Col>
                    <Button
                        type="text"
                        className="btn-close"
                        onClick={() => closeWarning && closeWarning()}
                    >
                        <img src={icActionsCloseSimple} alt="icon" />
                    </Button>
                </>
            )}
        </Row>
    );
};

export default BannerNotifyPackage;
