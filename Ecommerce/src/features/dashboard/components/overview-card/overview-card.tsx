import {Col, Row} from 'antd';
import React, {FC} from 'react';
import {InsaCard} from '../../../../components';

import './overview-card.less';

interface Props {
    title: string;
    value: string;
    color: string;
    valueTitle: string;
}

const OverviewCard: FC<Props> = ({title, value, color, valueTitle}) => {
    return (
        <InsaCard
            bordered
            style={{borderBottom: `5px solid ${color}`}}
            bodyStyle={{
                padding: 14,
            }}
        >
            <div className="overview-card__title">{title}</div>

            <Row justify="center">
                <Col style={{textAlign: 'center'}}>
                    <div className="overview-card__value">{value}</div>
                    <span className="overview-card__value-title">
                        {valueTitle}
                    </span>
                </Col>
            </Row>
        </InsaCard>
    );
};

export {OverviewCard};
