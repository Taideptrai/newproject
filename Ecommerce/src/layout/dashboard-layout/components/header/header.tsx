import {Col, Row} from 'antd';
import React, {FC} from 'react';
import {Logo} from '../../../../components';
import {AuthHeader} from './auth-header';
import './header.less';

const HeaderDasboard: FC = () => {
    return (
        <div className="dashboard_header">
            <Row justify="space-between" align="middle" style={{height: 60}}>
                <Col>
                    <Logo isDashboard size={25} />
                </Col>
                <Col>
                    <AuthHeader />
                </Col>
            </Row>
        </div>
    );
};

export {HeaderDasboard};
