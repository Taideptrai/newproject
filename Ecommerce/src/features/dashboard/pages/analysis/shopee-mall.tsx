import {RightOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import React, {FC} from 'react';
import Slider from 'react-slick';
import aosomi from '../../../../assets/icon/aosomi.png';
import aothun from '../../../../assets/icon/aothun.png';
import {InsaCard} from '../../../../components';
import {NextButton, PrevButton} from '../../components/nav-button';
import {ProductCard} from '../../components/product-card';

const shops = [
    {
        id: 1,
        name: 'Vatino',
        date: '04/09/2018',
        image: aothun,
    },
    {
        id: 2,
        name: 'ONOFF_Official',
        date: '19/10/2018',
        image: aosomi,
    },
    {
        id: 3,
        name: 'Thời trang thương hiệu Việt',
        date: '26/07/2019',
        image: aosomi,
    },
    {
        id: 4,
        name: 'Kojiba Việt Nam',
        date: '04/09/2018',
        image: aothun,
    },
    {
        id: 5,
        name: 'Thời trang Everest',
        date: '04/09/2018',
        image: aothun,
    },
    {
        id: 6,
        name: '4U Shop',
        date: '04/09/2018',
        image: aosomi,
    },
    {
        id: 7,
        name: 'LADOS',
        date: '06/09/2019',
        image: aosomi,
    },
    {
        id: 8,
        name: '4U Shop',
        date: '04/09/2018',
        image: aosomi,
    },
];

const ShopeeMall: FC = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        responsive: [
            {
                breakpoint: 1370,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    initialSlide: 6,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    initialSlide: 5,
                },
            },
            {
                breakpoint: 1040,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 4,
                },
            },
            {
                breakpoint: 890,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <InsaCard
            bordered
            title={<div className="title-card">SHOPEE MALL</div>}
            className="shopee-mall"
            extra={
                <Button type="link">
                    Xem tất cả
                    <RightOutlined />
                </Button>
            }
        >
            <Slider className="shopee-mall-wrapper" {...settings}>
                {shops.map(shop => (
                    <ProductCard
                        key={shop.id}
                        className="shopee-mall--item"
                        image={shop.image}
                        title={shop.name}
                        detail={shop.date}
                    />
                ))}
            </Slider>
        </InsaCard>
    );
};

export {ShopeeMall};
