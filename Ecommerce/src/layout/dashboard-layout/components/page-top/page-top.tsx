import React, {FC, ReactNode} from 'react';

import {Col, Row} from 'antd';

interface Props {
    title: string;
    rightContent?: ReactNode;
}

const PageTop: FC<Props> = ({title, rightContent}) => {
    return (
        <div className="page-top">
            <Row justify="space-between" align="middle">
                <Col>
                    <h2 className="page-top_title">{title}</h2>
                </Col>
                <Col>{rightContent}</Col>
            </Row>
        </div>
    );
};

export {PageTop};
