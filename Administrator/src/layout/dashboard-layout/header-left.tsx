import { Button, Row, Col } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { menus } from './sidebar';

interface Props {}

const HeaderLeft = (props: Props) => {
    const location = useLocation();

    const menu = menus.find((m: any) => m.to === location.pathname);

    const title = menu ? menu.title : '';

    return (
        <Row justify='center' align='middle' gutter={10}>
            <Col>
                <span style={{ fontSize: 18 }}>{title}</span>
            </Col>
        </Row>
    );
};

export default HeaderLeft;
