import {QuestionCircleOutlined} from '@ant-design/icons';
import {Button, Row, Col} from 'antd';
import React, {FC} from 'react';
import Helmet from 'react-helmet';
import {PageTop} from '../../../../layout/dashboard-layout/components';
import {KeywordSearchedAlot} from './keyword-searched-alot';
import {ProductPortfolio} from './product-portfolio';
import {ProductRecommendation} from './product-recommendation';
import {ShopeeMall} from './shopee-mall';
import './analysis.less';

const title = 'Phân tích thị trường';

const Analysis: FC = () => {
    const rightContent = (
        <Button icon={<QuestionCircleOutlined />}>Trợ giúp</Button>
    );
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <PageTop title={title} rightContent={rightContent} />
            <div className="analysis">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <KeywordSearchedAlot />
                    </Col>
                    <Col xs={24} md={16}>
                        <ProductPortfolio />
                    </Col>
                    <Col xs={24}>
                        <ProductRecommendation />
                    </Col>
                    <Col xs={24}>
                        <ShopeeMall />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Analysis;
