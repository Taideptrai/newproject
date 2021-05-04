import React, {FC} from 'react';
import {Card} from './card';
import {data, Item} from './data';

interface Props {}

const Feature: FC<Props> = () => {
    return (
        <div className="home-section home-feature">
            <div className="home-title text-center">
                <h4>Tối đa hiệu quả việc kinh doanh trên Shopee</h4>
                <p>Việc kinh doanh trở nên dễ dàng với bộ công cụ mạnh mẽ</p>
            </div>

            <div className="home-content">
                {data.map((item: Item) => {
                    return <Card item={item} key={item.title} />;
                })}
            </div>
        </div>
    );
};

export {Feature};
