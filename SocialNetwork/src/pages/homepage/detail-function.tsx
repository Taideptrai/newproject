import { Col, Row } from 'antd';
import React from 'react';
import { Element } from 'react-scroll';
import content from './content';
import { CheckCircleOutlined } from '@ant-design/icons';

const DetailFunction = () => {
    return (
        <div className='detail-function'>
            {content.detail_function.contents.map((item, index) => {
                const flexDirection = index % 2 !== 0 ? 'row-reverse' : 'row';

                return (
                    <div className='item_detail' key={item.title}>
                        <Element name={item.id}>
                            <div className='container'>
                                <Row
                                    gutter={60}
                                    align='middle'
                                    style={{
                                        flexDirection,
                                    }}
                                >
                                    <Col md={11} sm={24} xs={24}>
                                        <h3>{item.title}</h3>
                                        <ul>
                                            {item.list.map((l) => (
                                                <li key={l}>
                                                    <Row gutter={20}>
                                                        <Col>
                                                            <CheckCircleOutlined
                                                                style={{ color: '#1e4798' }}
                                                            />
                                                        </Col>
                                                        <Col style={{ flex: 1 }}>{l}</Col>
                                                    </Row>
                                                </li>
                                            ))}
                                        </ul>
                                    </Col>

                                    <Col md={13} sm={24} xs={24}>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            style={{
                                                display: 'inline-block',
                                                maxWidth: '100%',
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Element>
                    </div>
                );
            })}
        </div>
    );
};

export default DetailFunction;
