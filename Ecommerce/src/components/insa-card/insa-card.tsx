import React, {FC, ReactNode} from 'react';
import {Card} from 'antd';
import {CardProps} from 'antd/lib/card';
import cls from 'classnames';

import './insa-card.less';

interface Props extends CardProps {
    children: ReactNode;
}

const InsaCard: FC<Props> = ({children, className, ...props}) => {
    return (
        <Card {...props} className={cls('insa-card', className)} bordered>
            {children}
        </Card>
    );
};

export {InsaCard};
