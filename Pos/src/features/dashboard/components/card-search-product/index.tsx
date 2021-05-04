import { Card, Col, Row } from 'antd';
import React from 'react';
import { Product } from '../../../../collections/product';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import SearchProduct from '../search-product';
import BtnNewOrder from './btn-new-order';

const CardSearchProduct = () => {
    const { addProduct } = useSalesCounter();

    const selectProduct = (product: Product) => {
        addProduct({ ...product, count: 1 });
    };

    return (
        <Card className='card-shadow' bodyStyle={{ padding: '16px 24px', background: '#f6f8f8' }}>
            <Row style={{ marginBottom: 15 }} justify='space-between' align='middle'>
                <Col>
                    <div className='title-card'>
                        <span>Bán hàng</span>
                    </div>
                </Col>

                <Col>
                    <BtnNewOrder />
                </Col>
            </Row>

            <SearchProduct selectProduct={selectProduct} />
        </Card>
    );
};

export default CardSearchProduct;
