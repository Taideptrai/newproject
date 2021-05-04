import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {Button, Tooltip} from 'antd';
import React, {FC} from 'react';
import {CustomArrowProps} from 'react-slick';
import classNames from 'classnames';

import './nav-button.less';

const PrevButton: FC<CustomArrowProps> = ({className, style, onClick}) => {
    console.log({style});

    return (
        <Tooltip title="Prev">
            <Button
                onClick={onClick}
                className={classNames(className, 'dashboard-nav-btn')}
                style={{...style}}
                shape="circle"
                icon={<LeftOutlined style={{fontSize: 12, color: '#7C8797'}} />}
                size="small"
            />
        </Tooltip>
    );
};
const NextButton: FC<CustomArrowProps> = ({className, style, onClick}) => {
    return (
        <Tooltip title="Next">
            <Button
                onClick={onClick}
                className={classNames(className, 'dashboard-nav-btn')}
                shape="circle"
                style={{...style}}
                icon={
                    <RightOutlined style={{fontSize: 12, color: '#7C8797'}} />
                }
                size="small"
            />
        </Tooltip>
    );
};

export {PrevButton, NextButton};
