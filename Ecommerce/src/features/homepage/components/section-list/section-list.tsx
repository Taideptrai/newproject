import {Col, Row} from 'antd';
import React, {FC} from 'react';
import check from '../../assets/images/check.svg';
import {data, Item} from './data';

interface Props {}

const SectionList: FC<Props> = () => {
    return (
        <div>
            {data.map((item: Item, index: number) => {
                const background = index % 2 === 0 ? '#fff' : '#f5f9fd';

                const flexDirection = index % 2 === 0 ? 'row' : 'row-reverse';

                return (
                    <div
                        key={item.key}
                        className="section-list"
                        style={{background, padding: '50px 0'}}
                    >
                        <div className="container">
                            <Row
                                align="middle"
                                gutter={30}
                                style={{
                                    flexDirection,
                                }}
                            >
                                <Col md={12}>
                                    <h5>{item.title}</h5>
                                    <ul>
                                        {item.text_list.map(i => (
                                            <li key={i}>
                                                <Row gutter={30}>
                                                    <Col>
                                                        <img
                                                            src={check}
                                                            alt=""
                                                        />
                                                    </Col>
                                                    <Col style={{flex: 1}}>
                                                        <span
                                                            style={{
                                                                marginTop: 3,
                                                            }}
                                                        >
                                                            {i}
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </li>
                                        ))}
                                    </ul>
                                </Col>
                                <Col md={12}>
                                    <div className="img">
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export {SectionList};
