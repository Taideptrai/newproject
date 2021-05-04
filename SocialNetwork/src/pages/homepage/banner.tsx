import { Button, Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import banner from './images/banner.svg';
import { Container } from '../../components';
import content from './content';

function Banner(): JSX.Element {
    const isAuth = useSelector((state: any) => state.auth.isAuth);
    const renderButton = () => {
        if (isAuth) return null;

        return (
            <Link to='/signup'>
                <Button size='large' className='btn-trial'>
                    Dùng thử miễn phí
                </Button>
            </Link>
        );
    };
    return (
        <div className=' banner'>
            <div className='container'>
                <Row gutter={20}>
                    <Col md={9}>
                        <h1>{content.banner.h1}</h1>
                        <p>{content.banner.p}</p>

                        {renderButton()}
                    </Col>
                    <Col md={15}>
                        <img src={banner} alt='' />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Banner;
