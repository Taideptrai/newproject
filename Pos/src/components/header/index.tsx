import { Col, Row } from 'antd';
import React, { FC } from 'react';
import HeaderLeft from './header-left';
import HeaderRight from './header-right';
import './header.less';

const Header: FC = () => {
    return (
        <div className='header'>
            <Row className='header-container' justify='space-between' align='middle'>
                <Col>
                    <HeaderLeft />
                </Col>
                <Col>
                    <HeaderRight />
                </Col>
            </Row>
        </div>
    );
};

export default Header;
