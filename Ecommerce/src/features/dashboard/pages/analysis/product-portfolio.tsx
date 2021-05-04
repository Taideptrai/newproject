import React, {FC} from 'react';
import Slider from 'react-slick';
import aosomi from '../../../../assets/icon/aosomi.png';
import aothun from '../../../../assets/icon/aothun.png';
import {InsaCard} from '../../../../components';
import {NextButton, PrevButton} from '../../components/nav-button';
import {ProductCard} from '../../components/product-card';

const products = [
    {
        id: 1,
        name: 'Áo thun',
        category: 'T-shirt',
        image: aothun,
    },
    {
        id: 2,
        name: 'Áo sơ mi',
        category: 'Shirts',
        image: aosomi,
    },
    {
        id: 3,
        name: 'Áo sơ mi',
        category: 'Shirts',
        image: aosomi,
    },
    {
        id: 4,
        name: 'Áo sơ mi',
        category: 'Shirts',
        image: aothun,
    },
    {
        id: 5,
        name: 'Áo sơ mi',
        category: 'Shirts',
        image: aothun,
    },
    {
        id: 6,
        name: 'Áo sơ mi',
        category: 'Shirts',
        image: aosomi,
    },
    {
        id: 7,
        name: 'Áo sơ mi',
        category: 'Shirts',
        image: aosomi,
    },
    {
        id: 8,
        name: 'Áo khoác & Áo vest',
        category: 'Jackets & Blazers',
        image: aothun,
    },
    {
        id: 9,
        name: 'Áo khoác & Áo vest',
        category: 'Jackets & Blazers',
        image: aothun,
    },
];

const ProductPortfolio: FC = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        rows: 2,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
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
            className="product-portfolio"
            title={<div className="title-card">DANH MỤC SẢN PHẨM</div>}
        >
            <Slider className="product-portfolio-wrapper" {...settings}>
                {products?.map(product => (
                    <ProductCard
                        key={product.id}
                        className="product-portfolio--item"
                        image={product.image}
                        title={product.name}
                        detail={product.category}
                    />
                ))}
            </Slider>
        </InsaCard>
    );
};

export {ProductPortfolio};
