import {Card} from 'antd';
import clx from 'classnames';
import React, {FC} from 'react';
import './product-card.less';

interface Props {
    className?: string;
    image: string;
    title: string;
    detail: string;
}

const ProductCard: FC<Props> = ({className, image, title, detail}) => {
    return (
        <Card
            bordered={false}
            className={clx('dashboard-card-product', className)}
        >
            <img src={image} alt={title} />
            <div className="title-detail">
                <p className="dashboard-card-product--title">{title}</p>
                <p className="dashboard-card-product--detail">{detail}</p>
            </div>
        </Card>
    );
};

export {ProductCard};
