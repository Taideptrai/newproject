import { Col, Row } from 'antd';
import React from 'react';
import HeaderLeft from './header-left';
import HeaderRight from './header-right';

const Header = () => {
    return (
        <Row justify='space-between' align='middle' className='content-header'>
            <Col>
                <HeaderLeft />
            </Col>
            <Col>
                <HeaderRight />
            </Col>
        </Row>
    );
};

export default Header;
