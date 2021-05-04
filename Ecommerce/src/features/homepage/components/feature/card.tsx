import React, {FC} from 'react';
import arrow from '../../assets/images/arrow.svg';
import {Item} from './data';

interface Props {
    item: Item;
}

const Card: FC<Props> = ({item}) => {
    return (
        <div className="card">
            <div>
                <img src={item.img} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
            </div>
            <div>
                <span className="read_more">
                    Xem thêm
                    <img src={arrow} alt="" />
                </span>
            </div>
        </div>
    );
};

export {Card};
